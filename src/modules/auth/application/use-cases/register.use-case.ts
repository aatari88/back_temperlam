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

  async execute(email: string, password: string): Promise<User> {
    // Step 1: Validate input (basic validation)
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    // Step 2: Check if user already exists via repository
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Step 3: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create user via repository
    const user = await this.userRepository.create(email, hashedPassword);

    // Step 5: Return domain entity (NO DTO)
    return user;
  }
}
