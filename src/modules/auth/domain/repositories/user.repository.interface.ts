import type { User } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(
    email: string | undefined,
    hashedPassword: string,
    fullName: string,
    username: string,
  ): Promise<User>;
  updateRefreshToken(userId: string, hashedRefreshToken: string): Promise<void>;
}

export const USER_REPOSITORY = 'IUserRepository';
