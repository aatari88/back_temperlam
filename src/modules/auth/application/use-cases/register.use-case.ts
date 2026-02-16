import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

/**
 * RegisterUseCase - Application Layer
 * Responsible for:
 * - Validating user input
 * - Checking if user already exists
 * - Creating new user
 * - Returning Domain entity (NOT DTO)
 */
@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(username: string, password: string, fullName: string, email?: string): Promise<User> {
    // Step 1: Validate input (basic validation)
    if (!username || !password || !fullName) {
      throw new BadRequestException('Username, password, and fullName are required');
    }

    // Step 2: Check if user already exists via repository
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('User with this username already exists');
    }

    // Step 3: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create user via repository
    const user = await this.userRepository.create(email, hashedPassword, fullName, username);

    // Step 5: Return domain entity (NO DTO)
    return user;
  }
}
