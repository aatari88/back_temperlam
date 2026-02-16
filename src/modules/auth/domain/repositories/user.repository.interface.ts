import { User } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(email: string, hashedPassword: string): Promise<User>;
  updateRefreshToken(userId: string, hashedRefreshToken: string): Promise<void>;
}

export const USER_REPOSITORY = 'IUserRepository';
