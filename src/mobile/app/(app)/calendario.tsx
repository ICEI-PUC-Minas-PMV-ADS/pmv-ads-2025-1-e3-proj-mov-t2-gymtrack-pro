import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';
import UserSelector from '@/components/UserSelector';

const API_URL = __DEV__ ? 'http://localhost:3000' : 'https://production-api.com';

export default function Calendario() {
  const { user } = useAuth();
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('');

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    carregarDados();
  }, [selectedUserId]);

  const carregarDados = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      // Determinar qual usuário carregar
      const targetUserId = isAdmin && selectedUserId ? selectedUserId : null;
      const apiUrl = targetUserId 
        ? `${API_URL}/api/v1/attendance?userId=${targetUserId}`
        : `${API_URL}/api/v1/attendance`;

      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const markedDatesFromAPI: any = {};
        
        data.attendances.forEach((attendance: any) => {
          const dateString = new Date(attendance.date).toISOString().split('T')[0];
          markedDatesFromAPI[dateString] = {
            customStyles: {
              container: {},
              text: { 
                color: attendance.present ? 'green' : 'red', 
                fontWeight: 'bold' 
              },
            },
          };
        });

        setMarkedDates(markedDatesFromAPI);
        
        // Salvar no AsyncStorage apenas se for o próprio usuário
        if (!targetUserId) {
          await AsyncStorage.setItem('treinos', JSON.stringify(markedDatesFromAPI));
        }
      } else {
        // Fallback para dados locais se a API falhar (apenas para próprio usuário)
        if (!targetUserId) {
          const dados = await AsyncStorage.getItem('treinos');
          if (dados) {
            setMarkedDates(JSON.parse(dados));
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Fallback para dados locais (apenas para próprio usuário)
      if (!isAdmin || !selectedUserId) {
        const dados = await AsyncStorage.getItem('treinos');
        if (dados) {
          setMarkedDates(JSON.parse(dados));
        }
      }
    }
    setLoading(false);
  };

  const salvarDados = async (dados: any) => {
    await AsyncStorage.setItem('treinos', JSON.stringify(dados));
  };

  const aoSelecionarDia = async (day: any) => {
    // Não permitir edição se for admin visualizando outro usuário
    if (isAdmin && selectedUserId) {
      // Admin pode editar dados de alunos
      const targetUserId = selectedUserId;
      await aoSelecionarDiaAdmin(day, targetUserId);
    } else {
      // Usuário editando próprios dados
      await aoSelecionarDiaUsuario(day);
    }
  };

  const aoSelecionarDiaAdmin = async (day: any, targetUserId: string) => {
    const date = day.dateString;
    const currentMark = (markedDates as any)[date];

    const novoMarked = { ...markedDates };
    let presente: boolean | null = null;

    if (!currentMark) {
      // Marcar como PRESENÇA (verde)
      (novoMarked as any)[date] = {
        customStyles: {
          container: {},
          text: { color: 'green', fontWeight: 'bold' },
        },
      };
      presente = true;
    } else if (currentMark?.customStyles?.text?.color === 'green') {
      // Trocar para FALTA (vermelho)
      (novoMarked as any)[date] = {
        customStyles: {
          container: {},
          text: { color: 'red', fontWeight: 'bold' },
        },
      };
      presente = false;
    } else if (currentMark?.customStyles?.text?.color === 'red') {
      // Desmarcar (remover)
      delete (novoMarked as any)[date];
      presente = null;
    }

    // Atualizar estado local imediatamente
    setMarkedDates(novoMarked);

    // Sincronizar com backend para o usuário selecionado
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        if (presente === null) {
          // Deletar do backend
          await fetch(`${API_URL}/api/v1/attendance`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, userId: targetUserId }),
          });
        } else {
          // Criar/atualizar no backend
          await fetch(`${API_URL}/api/v1/attendance`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, present: presente, userId: targetUserId }),
          });
        }
      }
    } catch (error) {
      console.error('Erro ao sincronizar com backend:', error);
    }
  };

  const aoSelecionarDiaUsuario = async (day: any) => {
    const date = day.dateString;
    const currentMark = (markedDates as any)[date];

    const novoMarked = { ...markedDates };
    let presente: boolean | null = null;

    if (!currentMark) {
      // Marcar como PRESENÇA (verde)
      (novoMarked as any)[date] = {
        customStyles: {
          container: {},
          text: { color: 'green', fontWeight: 'bold' },
        },
      };
      presente = true;
    } else if (currentMark?.customStyles?.text?.color === 'green') {
      // Trocar para FALTA (vermelho)
      (novoMarked as any)[date] = {
        customStyles: {
          container: {},
          text: { color: 'red', fontWeight: 'bold' },
        },
      };
      presente = false;
    } else if (currentMark?.customStyles?.text?.color === 'red') {
      // Desmarcar (remover)
      delete (novoMarked as any)[date];
      presente = null;
    }

    // Atualizar estado local imediatamente
    setMarkedDates(novoMarked);
    salvarDados(novoMarked);

    // Sincronizar com backend
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        if (presente === null) {
          // Deletar do backend
          await fetch(`${API_URL}/api/v1/attendance`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date }),
          });
        } else {
          // Criar/atualizar no backend
          await fetch(`${API_URL}/api/v1/attendance`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, present: presente }),
          });
        }
      }
    } catch (error) {
      console.error('Erro ao sincronizar com backend:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isAdmin && (
        <UserSelector
          selectedUserId={selectedUserId}
          onUserSelect={(userId, userName) => {
            setSelectedUserId(userId);
            setSelectedUserName(userName);
            // Limpar dados ao trocar usuário
            setMarkedDates({});
          }}
        />
      )}
      
      <Text style={styles.titulo}>
        {isAdmin && selectedUserId 
          ? `Calendário de Treinos - ${selectedUserName}`
          : 'Calendário de Treinos'
        }
      </Text>
      
      <Calendar
        onDayPress={aoSelecionarDia}
        markedDates={markedDates}
        markingType={'custom'}
      />
      <View style={styles.legenda}>
        <View style={styles.itemLegenda}>
          <View style={[styles.cor, { backgroundColor: 'green' }]} />
          <Text>Treinou</Text>
        </View>
        <View style={styles.itemLegenda}>
          <View style={[styles.cor, { backgroundColor: 'red' }]} />
          <Text>Faltou</Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  legenda: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  itemLegenda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cor: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: 4,
  },
});
