export class User {
  id: string;
  username: string;
  email?: string;
  password: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    username: string;
    email?: string;
    password: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.fullName = data.fullName;
    this.isActive = data.isActive;
    this.roles = data.roles;
    this.refreshToken = data.refreshToken;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
