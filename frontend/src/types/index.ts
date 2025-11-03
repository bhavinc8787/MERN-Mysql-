export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  isAdmin?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: File;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatar?: File;
}