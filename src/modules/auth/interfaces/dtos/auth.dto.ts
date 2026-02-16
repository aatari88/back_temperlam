import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}

export class RefreshTokenRequestDto {
  userId: string;
  refreshToken: string;
}

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email?: string;
  };
}

export class RegisterResponseDto {
  id: string;
  username: string;
  email?: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  createdAt: Date;
}

export class RefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}
