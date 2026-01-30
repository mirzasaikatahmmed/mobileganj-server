import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities';
import { UserRole } from '../../common/constants';

export async function seedSuperAdmin(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);

  const superAdminEmail =
    process.env.SUPERADMIN_EMAIL || 'superadmin@mobileganj.com';
  const superAdminPassword = process.env.SUPERADMIN_PASSWORD || 'superadmin123';
  const superAdminName = process.env.SUPERADMIN_NAME || 'Super Admin';
  const superAdminPhone = process.env.SUPERADMIN_PHONE || '01700000001';

  const existingSuperAdmin = await userRepository.findOne({
    where: { email: superAdminEmail },
  });

  if (!existingSuperAdmin) {
    const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

    const superAdmin = userRepository.create({
      name: superAdminName,
      email: superAdminEmail,
      phone: superAdminPhone,
      password: hashedPassword,
      role: UserRole.SUPERADMIN,
      isActive: true,
    });

    await userRepository.save(superAdmin);
  } else {
    if (existingSuperAdmin.role !== UserRole.SUPERADMIN) {
      existingSuperAdmin.role = UserRole.SUPERADMIN;
      await userRepository.save(existingSuperAdmin);
    }
  }
}
