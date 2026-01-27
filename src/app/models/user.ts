import { UserRole } from "./user-role";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse
}

export class UserResponse {
  id: string;
  username: string;
  email: string;
  role: UserRole;

  constructor(id: string, username: string, email: string, role: UserRole) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
  }
}

