import { useAuth } from '@/contexts/AuthContext';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#007BFF',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
        }}
        onPress={() => {
          // O AuthProvider irá redirecionar para a tela de login.
          logout();
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
