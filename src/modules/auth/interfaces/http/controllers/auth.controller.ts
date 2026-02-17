import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  LoginUseCase,
  RegisterUseCase,
  RefreshTokenUseCase,
} from '../../../application/use-cases';
import { JwtAuthGuard } from '../../../../../shared/guards/jwt-auth.guard';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  RefreshTokenResponseDto,
} from '../../dtos/auth.dto';

/**
 * AuthController - Interfaces Layer
 * Responsible for:
 * - Receiving HTTP requests
 * - Validating input DTOs
 * - Routing to appropriate use cases
 * - Mapping domain entities to response DTOs
 * - Returning HTTP responses
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and receive access/refresh tokens',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() credentials: LoginRequestDto): Promise<LoginResponseDto> {
    // Get domain entity from use case
    const result = await this.loginUseCase.execute(credentials);

    // Map domain entity to response DTO
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: {
        id: result.user.id,
        username: result.user.username,
        email: result.user.email,
      },
    };
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
    description: 'Create a new user account',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or user already exists',
  })
  async register(
    @Body() credentials: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    // Get domain entity from use case
    const user = await this.registerUseCase.execute(
      credentials.username,
      credentials.password,
      credentials.fullName,
      credentials.email,
    );

    // Map domain entity to response DTO
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      isActive: user.isActive,
      roles: user.roles,
      createdAt: user.createdAt,
    };
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Refresh tokens',
    description: 'Get new access token using refresh token',
  })
  @ApiResponse({
    status: 200,
    description: 'Tokens successfully refreshed',
    type: RefreshTokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired token',
  })
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
