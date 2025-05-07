import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Mock user
    const mockUser = { email: 'teste@teste.com', password: '123456' };
    if (email === mockUser.email && password === mockUser.password) {
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      setIsAuthenticated(true);
      router.replace('/');
      return true;
    } else {
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsAuthenticated(false);
    router.replace('../sign-in');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};