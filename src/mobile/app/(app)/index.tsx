import { useAuth } from '@/contexts/AuthContext';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';  // <<< IMPORTAÇÃO CORRETA PARA EXPO ROUTER

export default function Index() {
  const { logout } = useAuth();
  const router = useRouter();  // <<< USO DO HOOK DE NAVEGAÇÃO DO EXPO ROUTER

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Botão para ir para a tela de Treino */}
      <TouchableOpacity
        style={{
          backgroundColor: '#28a745',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginBottom: 20,
        }}
        onPress={() => router.push('/treino')}  // <<< NAVEGAÇÃO PARA A ROTA /treino
      >
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
          Treino
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#007BFF',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
        }}
        onPress={() => {
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
