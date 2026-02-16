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
    // Step 1: Validate user credentials via repository
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Step 2: Verify password
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Step 3: Generate tokens
    const tokens = this.generateTokens(user.id, user.email);

    // Step 4: Persist refresh token via repository
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.userRepository.updateRefreshToken(user.id, hashedRefreshToken);

    // Step 5: Return domain entity with tokens (NO DTOs)
    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  private generateTokens(userId: string, email: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, email },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId, type: 'refresh' },
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }
}
