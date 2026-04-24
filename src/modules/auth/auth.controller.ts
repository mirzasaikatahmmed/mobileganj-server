import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  Ip,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';
import { Public } from '../../common/decorators';
import { CurrentUser } from '../../common/decorators';
import { User } from '../../database/entities';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../common/constants';
import { RolesGuard } from '../../common/guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description:
      'Login successful, returns JWT access token, refresh token and user info',
    schema: {
      type: 'object',
      properties: {
        user: { type: 'object' },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(
    @Request() req: { user: User },
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent?: string,
  ) {
    return this.authService.login(req.user, ipAddress, userAgent);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('register')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register new user (Admin only)' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('register/user')
  @ApiOperation({ summary: 'Public user self-registration' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      type: 'object',
      properties: {
        user: { type: 'object' },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  })
  async registerUser(
    @Body() registerDto: RegisterDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent?: string,
  ) {
    return this.authService.registerPublicUser(
      registerDto,
      ipAddress,
      userAgent,
    );
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns current user profile',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProfile(@CurrentUser('id') userId: string) {
    return this.authService.getProfile(userId);
  }

  @Post('change-password')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        oldPassword: { type: 'string', example: 'oldPassword123' },
        newPassword: {
          type: 'string',
          example: 'newPassword123',
          minLength: 6,
        },
      },
      required: ['oldPassword', 'newPassword'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or invalid old password',
  })
  async changePassword(
    @CurrentUser('id') userId: string,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(
      userId,
      body.oldPassword,
      body.newPassword,
    );
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Returns new access token and refresh token',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired refresh token' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout and revoke refresh token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Logout successful, refresh token revoked',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async logout(@Body() refreshTokenDto: RefreshTokenDto) {
    await this.authService.revokeRefreshToken(refreshTokenDto.refreshToken);
    return { message: 'Logged out successfully' };
  }
}
