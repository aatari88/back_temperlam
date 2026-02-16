import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/database';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserMapper } from '../mappers/user.mapper';

/**
 * UserRepository - Infrastructure Layer
 * Responsible for:
 * - Communicating with the database via Prisma
 * - Converting Prisma models to Domain entities using UserMapper
 * - Implementing the IUserRepository interface
 */
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async create(
    email: string | undefined,
    hashedPassword: string,
    fullName: string,
    username: string,
  ): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        id: `user_${Date.now()}`,
        username,
        email: email || null,
        password: hashedPassword,
        fullName,
        isActive: true,
        roles: [],
        updatedAt: new Date(),
      },
    });

    return UserMapper.toDomain(user);
  }

  async updateRefreshToken(
    userId: string,
    hashedRefreshToken: string,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: hashedRefreshToken,
        updatedAt: new Date(),
      },
    });
  }
}
