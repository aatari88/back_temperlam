export class LoginRequestDto {
  email: string;
  password: string;
}

export class RegisterRequestDto {
  email: string;
  password: string;
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
    email: string;
  };
}

export class RegisterResponseDto {
  id: string;
  email: string;
  createdAt: Date;
}

export class RefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}
