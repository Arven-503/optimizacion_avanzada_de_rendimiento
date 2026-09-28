export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  message?: string;
  access_token: string;
  token_type: string;
  user: User;
}

export interface AuthState {
  error?: string | null;
  success?: boolean;
}
