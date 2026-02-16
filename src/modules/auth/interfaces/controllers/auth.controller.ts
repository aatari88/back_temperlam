import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  LoginUseCase,
  RegisterUseCase,
  RefreshTokenUseCase,
} from '../../application/use-cases';
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  RefreshTokenResponseDto,
} from '../../interfaces/dtos/auth.dto';

/**
 * AuthController - Interfaces Layer
 * Responsible for:
 * - Receiving HTTP requests
 * - Validating input DTOs
 * - Routing to appropriate use cases
 * - Mapping domain entities to response DTOs
 * - Returning HTTP responses
 */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() credentials: LoginRequestDto): Promise<LoginResponseDto> {
    // Get domain entity from use case
    const result = await this.loginUseCase.execute(credentials);

    // Map domain entity to response DTO
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: {
        id: result.user.id,
        email: result.user.email,
      },
    };
  }

  @Post('register')
  async register(
    @Body() credentials: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    // Get domain entity from use case
    const user = await this.registerUseCase.execute(
      credentials.email,
      credentials.password,
    );

    // Map domain entity to response DTO
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(
    @Body() { refreshToken }: { refreshToken: string },
    @Req() req: any,
  ): Promise<RefreshTokenResponseDto> {
    // Get tokens from use case (business logic result)

    const result = await this.refreshTokenUseCase.execute(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      req.user.userId,
      refreshToken,
    );

    // Map to response DTO (in this case, it's already the correct shape)
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    };
  }
}
