import { User } from '../../domain/entities/user.entity';

/**
 * UserMapper - Infrastructure Layer
 * Responsible for mapping between Prisma User and Domain User entities.
 * This ensures that the Domain layer has no dependencies on Prisma or any ORM.
 */
export class UserMapper {
  /**
   * Maps a Prisma user record to a Domain User entity.
   * @param prismaUser The raw Prisma user record from the database
   * @returns A Domain User entity
   */
  static toDomain(prismaUser: {
    id: string;
    username: string;
    email: string | null;
    password: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User({
      id: prismaUser.id,
      username: prismaUser.username,
      email: prismaUser.email ?? undefined,
      password: prismaUser.password,
      fullName: prismaUser.fullName,
      isActive: prismaUser.isActive,
      roles: prismaUser.roles,
      refreshToken: prismaUser.refreshToken ?? undefined,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });
  }

  /**
   * Maps a Domain User entity to a Prisma-compatible format.
   * @param domainUser The Domain User entity
   * @returns A Prisma-compatible user object
   */
  static toPersistence(domainUser: User): {
    id: string;
    username: string;
    email: string | null;
    password: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: domainUser.id,
      username: domainUser.username,
      email: domainUser.email ?? null,
      password: domainUser.password,
      fullName: domainUser.fullName,
      isActive: domainUser.isActive,
      roles: domainUser.roles,
      refreshToken: domainUser.refreshToken ?? null,
      createdAt: domainUser.createdAt,
      updatedAt: domainUser.updatedAt,
    };
  }
}
