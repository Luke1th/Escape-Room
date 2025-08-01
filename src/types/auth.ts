export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthError {
  message: string;
  field?: string;
}

export interface AuthState {
  isLoading: boolean;
  error: AuthError | null;
}