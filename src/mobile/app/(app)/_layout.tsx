import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function AppLayout() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  const isAdmin = user?.role === 'ADMIN';

  console.log('User data:', user);
  console.log('Is Admin:', isAdmin);

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="dashboard" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="calendario"
          options={{
            title: 'Calendário',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="calendar-month" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="treino"
          options={{
            title: 'Treinos',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="fitness-center" size={size} color={color} />
            ),
          }}
        />

        {/* <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        /> */}

        {/* Controle de acesso para admin */}
        <Tabs.Screen
          name="profile"
          options={
            isAdmin
              ? {
                  title: 'Admin',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="admin-panel-settings" size={size} color={color} />
                  ),
                }
              : {
                title: 'Perfil',
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="person" size={size} color={color} />
                ),
              }
            }
        />

        <Tabs.Screen
          name="estatisticas"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}

