import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert, ScrollView, FlatList, ActionSheetIOS, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';
import UserSelector from '@/components/UserSelector';

const API_URL = __DEV__ ? 'http://localhost:3000' : 'https://production-api.com';

type WorkoutRoutine = {
  id: string;
  name: string;
  description: string;
};

type AttendanceRecord = {
  id: string;
  date: string;
  present: boolean;
  description: string;
  workoutRoutine?: WorkoutRoutine;
};

export default function Calendario() {
  const { user } = useAuth();
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  
  // Estados para o modal de treino
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [workoutRoutines, setWorkoutRoutines] = useState<WorkoutRoutine[]>([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('');
  const [trainingDescription, setTrainingDescription] = useState<string>('');
  
  // Estado para lista de últimos treinos
  const [recentTrainings, setRecentTrainings] = useState<AttendanceRecord[]>([]);

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    console.log('📱 useEffect disparado - selectedUserId:', selectedUserId);
    console.log('👤 usuário atual:', user?.id, user?.role);
    carregarDados();
    carregarRotinas();
  }, [selectedUserId]);

  const limparEstadosModal = () => {
    setShowTrainingModal(false);
    setSelectedDate('');
    setTrainingDescription('');
    setSelectedWorkoutId('');
  };

  const carregarRotinas = async () => {
    try {
      console.log('🔄 Iniciando carregamento das rotinas de treino...');
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('❌ Token não encontrado');
        setWorkoutRoutines([]);
        return;
      }

      const targetUserId = isAdmin && selectedUserId ? selectedUserId : null;
      const apiUrl = targetUserId 
        ? `${API_URL}/api/v1/workout-routines?userId=${targetUserId}`
        : `${API_URL}/api/v1/workout-routines`;

      console.log('🌐 URL da API:', apiUrl);
      console.log('🔑 Token existe:', !!token);
      console.log('👤 Admin?', isAdmin, '| User selecionado:', selectedUserId);

      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📊 Status da resposta:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Dados brutos da API:', JSON.stringify(data, null, 2));
        
        // Corrigir: usar data.routines ao invés de data.workoutRoutines
        if (data.routines && Array.isArray(data.routines)) {
          console.log('📋 Número de rotinas encontradas:', data.routines.length);
          const rotinasFormatadas = data.routines.map((rotina: any) => ({
            id: rotina.id,
            name: rotina.name,
            description: rotina.description || ''
          }));
          
          console.log('📋 Rotinas formatadas:', rotinasFormatadas);
          setWorkoutRoutines(rotinasFormatadas);
        } else {
          console.log('⚠️ Dados não estão no formato esperado ou array vazio');
          console.log('🔍 Estrutura dos dados:', Object.keys(data));
          setWorkoutRoutines([]);
        }
      } else {
        console.log('❌ Erro na resposta da API:', response.status, response.statusText);
        const errorText = await response.text();
        console.log('📝 Erro detalhado:', errorText);
        setWorkoutRoutines([]);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar rotinas:', error);
      console.error('Stack:', error instanceof Error ? error.stack : 'N/A');
      setWorkoutRoutines([]);
    }
  };

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
        const recentList: AttendanceRecord[] = [];
        
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

          // Adicionar aos treinos recentes (apenas os presentes)
          if (attendance.present) {
            recentList.push({
              id: attendance.id,
              date: dateString,
              present: attendance.present,
              description: attendance.description || '',
              workoutRoutine: attendance.workoutRoutine
            });
          }
        });

        setMarkedDates(markedDatesFromAPI);
        setRecentTrainings(recentList.slice(0, 5)); // Últimos 5 treinos
        
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

  const aoSelecionarDia = async (day: any) => {
    console.log('📅 Dia selecionado:', day.dateString);
    console.log('🔍 Estado atual do modal:', { showTrainingModal });
    
    // Garantir que o modal esteja fechado antes de abrir o novo
    setShowTrainingModal(false);
    
    // Aguardar um pequeno delay para garantir que o modal fechou
    setTimeout(async () => {
      setSelectedDate(day.dateString);
      setTrainingDescription('');
      setSelectedWorkoutId('');
      
      console.log('📅 Abrindo modal para data:', day.dateString);
      console.log('� Recarregando rotinas antes de abrir modal...');
      
      // Recarregar rotinas sempre que abrir o modal
      await carregarRotinas();
      
      console.log('📋 Rotinas disponíveis após reload:', workoutRoutines.length, 'rotinas');
      console.log('🔍 Detalhes das rotinas:', workoutRoutines.map(r => ({ id: r.id, name: r.name })));
      console.log('🎯 Estado showTrainingModal antes:', showTrainingModal);
      setShowTrainingModal(true);
      console.log('🎯 Definindo showTrainingModal para true');
    }, 100);
  };

  const salvarTreino = async (presente: boolean) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      const targetUserId = isAdmin && selectedUserId ? selectedUserId : null;
      
      const requestBody: any = {
        date: selectedDate,
        present: presente,
        workoutRoutineId: selectedWorkoutId || null,
        description: trainingDescription
      };

      if (targetUserId) {
        requestBody.userId = targetUserId;
      }

      const response = await fetch(`${API_URL}/api/v1/attendance`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Atualizar dados localmente
        const novoMarked = { ...markedDates };
        (novoMarked as any)[selectedDate] = {
          customStyles: {
            container: {},
            text: { color: presente ? 'green' : 'red', fontWeight: 'bold' },
          },
        };
        setMarkedDates(novoMarked);
        
        // Fechar modal primeiro
        limparEstadosModal();
        
        // Recarregar dados para atualizar lista de treinos recentes
        await carregarDados();
        
        Alert.alert('Sucesso!', presente ? 'Treino registrado!' : 'Falta registrada!');
      } else {
        Alert.alert('Erro', 'Não foi possível salvar o treino');
      }
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar');
    }
  };

  const removerTreino = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      const targetUserId = isAdmin && selectedUserId ? selectedUserId : null;
      
      const requestBody: any = {
        date: selectedDate
      };

      if (targetUserId) {
        requestBody.userId = targetUserId;
      }

      const response = await fetch(`${API_URL}/api/v1/attendance`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Remover marca do calendário
        const novoMarked = { ...markedDates };
        delete (novoMarked as any)[selectedDate];
        setMarkedDates(novoMarked);
        
        // Fechar modais primeiro
        limparEstadosModal();
        
        // Recarregar dados
        await carregarDados();
        
        Alert.alert('Sucesso!', 'Registro removido!');
      } else {
        Alert.alert('Erro', 'Não foi possível remover o registro');
      }
    } catch (error) {
      console.error('Erro ao remover treino:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao remover');
    }
  };

  const abrirSeletorRotinas = async () => {
    console.log('🖱️ Abrindo seletor nativo');
    console.log('📋 Rotinas disponíveis antes do fetch:', workoutRoutines.length);
    
    // Força uma nova atualização das rotinas sempre que clicar
    console.log('🔄 Forçando novo carregamento das rotinas...');
    await carregarRotinas();
    
    // Aguardar um pouco para garantir que o estado foi atualizado
    setTimeout(() => {
      console.log('📋 Rotinas disponíveis após fetch:', workoutRoutines.length);
      console.log('🔍 Lista de rotinas atualizada:', workoutRoutines);
      
      if (Platform.OS === 'ios') {
        // ActionSheet nativo do iOS
        const options = [
          'Cancelar',
          'Nenhuma ficha',
          ...workoutRoutines.map(r => r.name)
        ];
        
        console.log('📱 Opções do ActionSheet:', options);
        
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex: 0,
            title: 'Selecionar Ficha de Treino'
          },
          (buttonIndex) => {
            console.log('📱 Selecionou índice:', buttonIndex);
            if (buttonIndex === 0) {
              // Cancelar
              return;
            } else if (buttonIndex === 1) {
              // Nenhuma ficha
              console.log('🚫 Selecionou nenhuma ficha');
              setSelectedWorkoutId('');
            } else {
              // Rotina específica
              const routineIndex = buttonIndex - 2;
              const selectedRoutine = workoutRoutines[routineIndex];
              if (selectedRoutine) {
                console.log('✅ Selecionou rotina:', selectedRoutine.name);
                setSelectedWorkoutId(selectedRoutine.id);
              }
            }
          }
        );
      } else {
        // Fallback para Android - usar Alert
        Alert.alert(
          'Selecionar Ficha de Treino',
          'Escolha uma opção:',
          [
            { text: 'Cancelar', style: 'cancel' },
            { 
              text: 'Nenhuma ficha', 
              onPress: () => setSelectedWorkoutId('')
            },
            ...workoutRoutines.map(routine => ({
              text: routine.name,
              onPress: () => setSelectedWorkoutId(routine.id)
            }))
          ]
        );
      }
    }, 200);
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
            setRecentTrainings([]);
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

      {/* Lista dos últimos treinos */}
      <View style={styles.recentTrainings}>
        <Text style={styles.recentTitle}>Últimos 5 Treinos</Text>
        <FlatList
          data={recentTrainings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.trainingItem}>
              <Text style={styles.trainingDate}>
                {new Date(item.date).toLocaleDateString('pt-BR')}
              </Text>
              <Text style={styles.trainingWorkout}>
                {item.workoutRoutine?.name || 'Sem rotina definida'}
              </Text>
              <Text style={styles.trainingDescription}>
                {item.description || 'Sem descrição'}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum treino registrado ainda</Text>
          }
        />
      </View>

      {/* Modal para registrar treino */}
      <Modal
        visible={showTrainingModal}
        transparent={true}
        animationType="slide"
        onRequestClose={limparEstadosModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Registrar Treino - {selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : ''}
            </Text>

            {/* Seletor de rotina - NATIVO */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ficha de Treino:</Text>
              <TouchableOpacity 
                style={styles.picker}
                onPress={() => {
                  console.log('🖱️ Abrindo seletor nativo');
                  console.log('📋 Rotinas disponíveis:', workoutRoutines.length);
                  
                  if (Platform.OS === 'ios') {
                    // ActionSheet nativo do iOS
                    const options = [
                      'Cancelar',
                      'Nenhuma ficha',
                      ...workoutRoutines.map(r => r.name)
                    ];
                    
                    ActionSheetIOS.showActionSheetWithOptions(
                      {
                        options,
                        cancelButtonIndex: 0,
                        title: 'Selecionar Ficha de Treino'
                      },
                      (buttonIndex) => {
                        console.log('📱 Selecionou índice:', buttonIndex);
                        if (buttonIndex === 0) {
                          // Cancelar
                          return;
                        } else if (buttonIndex === 1) {
                          // Nenhuma ficha
                          console.log('� Selecionou nenhuma ficha');
                          setSelectedWorkoutId('');
                        } else {
                          // Rotina específica
                          const routineIndex = buttonIndex - 2;
                          const selectedRoutine = workoutRoutines[routineIndex];
                          console.log('✅ Selecionou rotina:', selectedRoutine.name);
                          setSelectedWorkoutId(selectedRoutine.id);
                        }
                      }
                    );
                  } else {
                    // Fallback para Android - usar Alert
                    Alert.alert(
                      'Selecionar Ficha de Treino',
                      'Escolha uma opção:',
                      [
                        { text: 'Cancelar', style: 'cancel' },
                        { 
                          text: 'Nenhuma ficha', 
                          onPress: () => setSelectedWorkoutId('')
                        },
                        ...workoutRoutines.map(routine => ({
                          text: routine.name,
                          onPress: () => setSelectedWorkoutId(routine.id)
                        }))
                      ]
                    );
                  }
                }}
              >
                <Text style={styles.pickerText}>
                  {selectedWorkoutId 
                    ? workoutRoutines.find(w => w.id === selectedWorkoutId)?.name || 'Selecione uma ficha'
                    : 'Selecione uma ficha (opcional)'
                  }
                </Text>
              </TouchableOpacity>
            </View>

            {/* Descrição */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição:</Text>
              <TextInput
                style={styles.textInput}
                value={trainingDescription}
                onChangeText={setTrainingDescription}
                placeholder="Descreva como foi o treino..."
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Botões de ação */}
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.button, styles.presentButton]}
                onPress={() => salvarTreino(true)}
              >
                <Text style={styles.buttonText}>Treinou</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.absentButton]}
                onPress={() => salvarTreino(false)}
              >
                <Text style={styles.buttonText}>Faltou</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.button, styles.removeButton]}
                onPress={removerTreino}
              >
                <Text style={styles.buttonText}>Remover</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={limparEstadosModal}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    marginBottom: 20,
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
  // Estilos para lista de treinos recentes
  recentTrainings: {
    flex: 1,
    marginTop: 10,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  trainingItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  trainingDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trainingWorkout: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  trainingDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  // Estilos para modais
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  presentButton: {
    backgroundColor: '#4CAF50',
  },
  absentButton: {
    backgroundColor: '#f44336',
  },
  removeButton: {
    backgroundColor: '#ff9800',
  },
  cancelButton: {
    backgroundColor: '#9e9e9e',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
