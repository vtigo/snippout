export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface AuthContext {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}