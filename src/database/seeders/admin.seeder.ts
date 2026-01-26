import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities';
import { UserRole } from '../../common/constants';

export async function seedAdmin(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);

  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@mobileganj.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = userRepository.create({
      name: 'Admin',
      email: 'admin@mobileganj.com',
      phone: '01700000000',
      password: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
    });

    await userRepository.save(admin);
    console.log('Admin user created: admin@mobileganj.com / admin123');
  } else {
    console.log('Admin user already exists');
  }
}
