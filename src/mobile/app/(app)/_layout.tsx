import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

// import backgroundImage from '../../assets/images/Fundo.jpg';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="calendario"
          options={{
            title: 'Calendário',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="calendar-today" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Botão flutuante do Calendário */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => router.push('/calendario')}
        >
          <MaterialIcons name="calendar-today" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Botão flutuante de Estatísticas */}
      <View style={styles.buttonWrapperEstatistica}>
        <TouchableOpacity
          style={styles.estatisticaButton}
          onPress={() => router.push('/estatisticas')}
        >
          <MaterialIcons name="bar-chart" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    bottom: 70,
    left: 40,
    zIndex: 100,
  },
  calendarButton: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 35,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  buttonWrapperEstatistica: {
    position: 'absolute',
    bottom: 70,
    right: 40,
    zIndex: 100,
  },
  estatisticaButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 35,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
