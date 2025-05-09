/**
 * Tipos de dados relacionados ao usuário
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  goal?: string;
}

export interface ProfileUpdates {
  name?: string;
  goal?: string;
  currentPassword?: string;
  newPassword?: string;
} 