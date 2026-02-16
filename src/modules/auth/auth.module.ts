import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../../shared/infrastructure/database';
import {
  LoginUseCase,
  RegisterUseCase,
  RefreshTokenUseCase,
} from './application/use-cases';
import { AuthController } from './interfaces/http/controllers/auth.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    // Use Cases (Application Layer)
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
    // Infrastructure
    JwtStrategy,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  controllers: [AuthController],
  exports: [LoginUseCase, RegisterUseCase, RefreshTokenUseCase],
})
export class AuthModule {}
