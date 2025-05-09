import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, ProfileUpdates, AuthContextType } from '@/types';

/* 
@IMPORTANTE:
Configurar a URL da API de acordo com o ambiente de produção
*/
const API_URL = __DEV__ ? 'http://localhost:3000' : 'https://production-api.com';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsAuthenticated(true);
        try {
          const userData = await AsyncStorage.getItem('userData');
          if (userData) {
            setUser(JSON.parse(userData));
          } else {
            await fetchUserProfile(token);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
    };
    checkAuth();
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        return false;
      }
      
      const data = await response.json();
      if (data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        setIsAuthenticated(true);
        await fetchUserProfile(data.token);
        router.replace('/(app)');
        return true;
      }
      return false;

    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, goal?: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, 
          email, 
          password, 
          goal: goal || undefined,
        }),
      });

      if (!response.ok) {
        return false;
      }

      return true;

    } catch (error) {
      throw new Error(error as string);
    }
  };

  const updateProfile = async (updates: ProfileUpdates) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return false;

      const response = await fetch(`${API_URL}/api/v1/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: updates.name,
          goal: updates.goal,
          ...(updates.newPassword ? { password: updates.newPassword } : {})
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return false;
      }

      setUser(data.user);
      await AsyncStorage.setItem('userData', JSON.stringify(data.user));
      
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
    router.replace('../sign-in');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      register,
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};