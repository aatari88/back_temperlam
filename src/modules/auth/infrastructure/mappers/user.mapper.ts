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
    email: string;
    password: string;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User({
      id: prismaUser.id,
      email: prismaUser.email,
      password: prismaUser.password,
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
    email: string;
    password: string;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: domainUser.id,
      email: domainUser.email,
      password: domainUser.password,
      refreshToken: domainUser.refreshToken ?? null,
      createdAt: domainUser.createdAt,
      updatedAt: domainUser.updatedAt,
    };
  }
}
