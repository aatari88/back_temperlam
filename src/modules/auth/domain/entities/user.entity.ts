export class User {
  id: string;
  email: string;
  password: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    email: string;
    password: string;
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.refreshToken = data.refreshToken;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
