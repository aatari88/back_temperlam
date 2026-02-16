import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { LoginRequestDto } from '../../interfaces/dtos/auth.dto';

/**
 * LoginUseCase - Application Layer
 * Responsible for:
 * - Authenticating user credentials
 * - Generating JWT tokens
 * - Persisting refresh token
 * - Returning Domain entities (NOT DTOs)
 */
interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(credentials: LoginRequestDto): Promise<LoginResponse> {
    // Step 1: Validate input
    if (!credentials.username || !credentials.password) {
      throw new UnauthorizedException('Username and password are required');
    }

    // Step 2: Find user by username via repository
    const user = await this.userRepository.findByUsername(credentials.username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Step 3: Verify password
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Step 4: Generate tokens
    const tokens = this.generateTokens(user.id, user.username);

    // Step 5: Persist refresh token via repository
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.userRepository.updateRefreshToken(user.id, hashedRefreshToken);

    // Step 6: Return domain entity with tokens (NO DTOs)
    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  private generateTokens(userId: string, username: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, username },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId, type: 'refresh' },
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }
}
