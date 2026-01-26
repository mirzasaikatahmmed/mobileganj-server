import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User, RefreshToken } from '../../database/entities';
import { RegisterDto } from './dto';
import { UserRole } from '../../common/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
      relations: ['branch'],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User, ipAddress?: string, userAgent?: string) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    const refreshToken = await this.generateRefreshToken(
      user.id,
      ipAddress,
      userAgent,
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        branch: user.branch,
      },
      accessToken,
      refreshToken: refreshToken.token,
    };
  }

  async generateRefreshToken(
    userId: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<RefreshToken> {
    const token = crypto.randomBytes(64).toString('hex');

    const refreshExpiresIn =
      this.configService.get<string>('jwt.refreshExpiresIn') || '30d';

    const expiresAt = new Date();
    const days = parseInt(refreshExpiresIn.replace('d', '')) || 30;
    expiresAt.setDate(expiresAt.getDate() + days);

    await this.revokeUserRefreshTokens(userId);

    const refreshToken = this.refreshTokenRepository.create({
      userId,
      token,
      expiresAt,
      ipAddress,
      userAgent,
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const token = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
      relations: ['user'],
    });

    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (token.isRevoked) {
      throw new UnauthorizedException('Refresh token has been revoked');
    }

    if (token.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token has expired');
    }

    const user = await this.userRepository.findOne({
      where: { id: token.userId, isActive: true },
      relations: ['branch'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    const newRefreshToken = await this.generateRefreshToken(
      user.id,
      token.ipAddress,
      token.userAgent,
    );

    token.isRevoked = true;
    await this.refreshTokenRepository.save(token);

    return {
      accessToken,
      refreshToken: newRefreshToken.token,
    };
  }

  async revokeRefreshToken(refreshToken: string): Promise<void> {
    const token = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
    });

    if (token) {
      token.isRevoked = true;
      await this.refreshTokenRepository.save(token);
    }
  }

  async revokeUserRefreshTokens(userId: string): Promise<void> {
    await this.refreshTokenRepository.update(
      { userId, isRevoked: false },
      { isRevoked: true },
    );
  }

  async cleanupExpiredTokens(): Promise<void> {
    await this.refreshTokenRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
      role: registerDto.role || UserRole.STAFF,
    });

    const savedUser = await this.userRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = savedUser;
    return result;
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['branch'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid old password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);

    await this.revokeUserRefreshTokens(userId);

    return { message: 'Password changed successfully' };
  }
}
