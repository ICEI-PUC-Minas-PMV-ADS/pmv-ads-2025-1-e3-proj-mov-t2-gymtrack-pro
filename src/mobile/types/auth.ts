/**
 * Tipos de dados relacionados ao autenticação
 */

import { User, ProfileUpdates } from './user';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, goal?: string) => Promise<boolean>;
  updateProfile: (updates: ProfileUpdates) => Promise<boolean>;
} 