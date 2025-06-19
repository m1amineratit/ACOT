export interface User {
  id: string;
  email: string;
  created_at: string;
  full_name?: string | null;
  avatar_url?: string | null;
  provider?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}