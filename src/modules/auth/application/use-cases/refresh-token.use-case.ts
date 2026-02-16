import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

/**
 * RefreshTokenUseCase - Application Layer
 * Responsible for:
 * - Validating refresh token
 * - Generating new JWT tokens
 * - Persisting new refresh token
 * - Returning tokens object (business logic result, NOT DTO)
 */
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    userId: string,
    refreshToken: string,
  ): Promise<RefreshTokenResponse> {
    // Step 1: Find user by ID via repository
    const user = await this.userRepository.findById(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Step 2: Verify refresh token validity
    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Step 3: Generate new tokens
    const tokens = this.generateTokens(user.id, user.username);

    // Step 4: Persist new refresh token via repository
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.userRepository.updateRefreshToken(user.id, hashedRefreshToken);

    // Step 5: Return tokens object (NO DTO - just business logic result)
    return {
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
