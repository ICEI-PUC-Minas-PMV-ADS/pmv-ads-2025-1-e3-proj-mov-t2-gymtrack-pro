import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';
import UserSelector from '@/components/UserSelector';

const API_URL = __DEV__ ? 'http://localhost:3000' : 'https://production-api.com';

type Exercicio = {
  nome: string;
  series: string;
};

type GrupoTreino = {
  grupo: string;
  exercicios: Exercicio[];
};

type RotinaSalva = {
  id?: string;
  name: string;
  description: string;
  exercises: GrupoTreino[];
};

// Dados dos grupos musculares e seus exercícios
const gruposMusculares = {
  Peito: [
    { nome: 'Supino Reto', series: '4x10' },
    { nome: 'Supino Inclinado', series: '4x10' },
    { nome: 'Crucifixo', series: '3x12' },
  ],
  Costas: [
    { nome: 'Puxada Frente', series: '4x10' },
    { nome: 'Remada Curvada', series: '4x10' },
    { nome: 'Puxada Triângulo', series: '3x12' },
  ],
  Pernas: [
    { nome: 'Agachamento Livre', series: '4x10' },
    { nome: 'Leg Press', series: '4x12' },
    { nome: 'Cadeira Extensora', series: '4x15' },
  ],
  Ombro: [
    { nome: 'Desenvolvimento Halteres', series: '4x10' },
    { nome: 'Elevação Lateral', series: '4x12' },
    { nome: 'Elevação Frontal', series: '3x12' },
  ],
  Bíceps: [
    { nome: 'Rosca Direta', series: '4x10' },
    { nome: 'Rosca Alternada', series: '4x12' },
    { nome: 'Rosca Martelo', series: '3x12' },
  ],
  Tríceps: [
    { nome: 'Tríceps Pulley', series: '4x10' },
    { nome: 'Tríceps Testa', series: '4x10' },
    { nome: 'Mergulho Banco', series: '3x12' },
  ],
};

export default function Treino() {
  const { user } = useAuth();
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [fichaSalva, setFichaSalva] = useState<GrupoTreino[]>([]);
  const [rotinasCarregadas, setRotinasCarregadas] = useState<RotinaSalva[]>([]);
  const [modalSalvar, setModalSalvar] = useState(false);
  const [nomeRotina, setNomeRotina] = useState('');
  const [descricaoRotina, setDescricaoRotina] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('');

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    carregarRotinas();
  }, [selectedUserId]);

  // Carregar rotinas do backend
  const carregarRotinas = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      // Determinar qual usuário carregar
      const targetUserId = isAdmin && selectedUserId ? selectedUserId : null;
      const apiUrl = targetUserId 
        ? `${API_URL}/api/v1/workout-routines?userId=${targetUserId}`
        : `${API_URL}/api/v1/workout-routines`;

      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const rotinasFormatadas = data.routines.map((rotina: any) => ({
          id: rotina.id,
          name: rotina.name,
          description: rotina.description,
          exercises: JSON.parse(rotina.exercises)
        }));
        setRotinasCarregadas(rotinasFormatadas);
      }
    } catch (error) {
      console.error('Erro ao carregar rotinas:', error);
    }
    setLoading(false);
  };

  // Salvar rotina no backend
  const salvarRotinaBackend = async () => {
    if (!nomeRotina.trim()) {
      Alert.alert('Erro', 'Digite um nome para a rotina!');
      return;
    }

    if (fichaSalva.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um grupo muscular à ficha!');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado');
        return;
      }

      const response = await fetch(`${API_URL}/api/v1/workout-routines`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nomeRotina,
          description: descricaoRotina,
          exercises: fichaSalva
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Rotina salva com sucesso!');
        setModalSalvar(false);
        setNomeRotina('');
        setDescricaoRotina('');
        setFichaSalva([]);
        carregarRotinas(); // Recarregar lista
      } else {
        Alert.alert('Erro', 'Falha ao salvar rotina');
      }
    } catch (error) {
      console.error('Erro ao salvar rotina:', error);
      Alert.alert('Erro', 'Erro de conexão');
    }
  };

  // Deletar rotina
  const deletarRotina = async (id: string, nome: string) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja excluir a rotina "${nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              if (!token) return;

              const response = await fetch(`${API_URL}/api/v1/workout-routines`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
              });

              if (response.ok) {
                Alert.alert('Sucesso', 'Rotina excluída com sucesso!');
                carregarRotinas();
              } else {
                Alert.alert('Erro', 'Falha ao excluir rotina');
              }
            } catch (error) {
              console.error('Erro ao excluir rotina:', error);
              Alert.alert('Erro', 'Erro de conexão');
            }
          },
        },
      ]
    );
  };

  // Carregar rotina na ficha atual
  const carregarRotina = (rotina: RotinaSalva) => {
    setFichaSalva(rotina.exercises);
    Alert.alert('Sucesso', `Rotina "${rotina.name}" carregada!`);
  };

  // Salvar treino selecionado na ficha
  const salvarFicha = () => {
    if (!grupoSelecionado) {
      Alert.alert('Erro', 'Selecione um grupo muscular!');
      return;
    }

    if (fichaSalva.find((f) => f.grupo === grupoSelecionado)) {
      Alert.alert('Aviso', 'Esse grupo já está na ficha!');
      return;
    }

    const exercicios = (gruposMusculares as any)[grupoSelecionado];

    setFichaSalva([...fichaSalva, { grupo: grupoSelecionado, exercicios }]);
    Alert.alert('Sucesso', 'Treino adicionado à ficha!');
  };

  // Função para remover grupo da ficha
  const removerGrupo = (grupo: string) => {
    Alert.alert(
      'Confirmar remoção',
      `Deseja remover o treino de ${grupo} da ficha?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            const novaFicha = fichaSalva.filter((f) => f.grupo !== grupo);
            setFichaSalva(novaFicha);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {isAdmin && (
        <UserSelector
          selectedUserId={selectedUserId}
          onUserSelect={(userId, userName) => {
            setSelectedUserId(userId);
            setSelectedUserName(userName);
            setFichaSalva([]); // Limpar ficha ao trocar de usuário
          }}
        />
      )}

      <Text style={styles.titulo}>
        {isAdmin && selectedUserId 
          ? `Treinos - ${selectedUserName}`
          : 'Montar Ficha de Treino'
        }
      </Text>

      <Text style={styles.subtitulo}>Selecione um grupo muscular:</Text>

      <View style={styles.grupoContainer}>
        {Object.keys(gruposMusculares).map((grupo) => (
          <TouchableOpacity
            key={grupo}
            style={[
              styles.botaoGrupo,
              grupoSelecionado === grupo && styles.botaoSelecionado,
            ]}
            onPress={() => setGrupoSelecionado(grupo)}
          >
            <Text style={styles.textoBotao}>{grupo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {grupoSelecionado ? (
        <View style={styles.exerciciosContainer}>
          <Text style={styles.subtitulo}>Exercícios de {grupoSelecionado}:</Text>
          {grupoSelecionado in gruposMusculares &&
            (gruposMusculares as any)[grupoSelecionado].map((item: any, index: any) => (
              <View key={index} style={styles.itemExercicio}>
                <Text style={styles.textoExercicio}>
                  {item.nome} - {item.series}
                </Text>
              </View>
            ))}

          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarFicha}>
            <Text style={styles.textoSalvar}>Salvar na Ficha</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {fichaSalva.length > 0 && (
        <View style={styles.fichaContainer}>
          <View style={styles.fichaHeader}>
            <Text style={styles.subtitulo}>Ficha Montada:</Text>
            <TouchableOpacity
              style={styles.botaoSalvarRotina}
              onPress={() => setModalSalvar(true)}
            >
              <Ionicons name="save-outline" size={20} color="#fff" />
              <Text style={styles.textoSalvar}>Salvar Rotina</Text>
            </TouchableOpacity>
          </View>
          {fichaSalva.map((ficha, index) => (
            <View key={index} style={styles.fichaGrupo}>
              <View style={styles.fichaHeaderGrupo}>
                <Text style={styles.nomeGrupo}>{ficha.grupo}</Text>
                <TouchableOpacity
                  onPress={() => removerGrupo(ficha.grupo)}
                  style={styles.botaoRemover}
                >
                  <Ionicons name="trash-outline" size={22} color="#dc3545" />
                </TouchableOpacity>
              </View>
              {ficha.exercicios.map((ex, idx) => (
                <Text key={idx} style={styles.itemFicha}>
                  {ex.nome} - {ex.series}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Lista de rotinas salvas */}
      {rotinasCarregadas.length > 0 && (
        <View style={styles.rotinasContainer}>
          <Text style={styles.subtitulo}>Rotinas Salvas:</Text>
          {rotinasCarregadas.map((rotina) => (
            <View key={rotina.id} style={styles.rotinaItem}>
              <View style={styles.rotinaInfo}>
                <Text style={styles.rotinaName}>{rotina.name}</Text>
                {rotina.description ? (
                  <Text style={styles.rotinaDescription}>{rotina.description}</Text>
                ) : null}
                <Text style={styles.rotinaExercises}>
                  {rotina.exercises.length} grupo(s) muscular(es)
                </Text>
              </View>
              <View style={styles.rotinaActions}>
                <TouchableOpacity
                  style={styles.botaoCarregar}
                  onPress={() => carregarRotina(rotina)}
                >
                  <Ionicons name="download-outline" size={18} color="#007bff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botaoExcluir}
                  onPress={() => deletarRotina(rotina.id!, rotina.name)}
                >
                  <Ionicons name="trash-outline" size={18} color="#dc3545" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Modal para salvar rotina */}
      <Modal
        visible={modalSalvar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalSalvar(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Salvar Rotina</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nome da rotina"
              value={nomeRotina}
              onChangeText={setNomeRotina}
            />
            
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Descrição (opcional)"
              value={descricaoRotina}
              onChangeText={setDescricaoRotina}
              multiline
              numberOfLines={3}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setModalSalvar(false);
                  setNomeRotina('');
                  setDescricaoRotina('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={salvarRotinaBackend}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextSave]}>
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  grupoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  botaoGrupo: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 5,
  },
  botaoSelecionado: {
    backgroundColor: '#007bff',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  exerciciosContainer: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  itemExercicio: {
    backgroundColor: '#b2ebf2',
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  textoExercicio: {
    fontSize: 16,
  },
  botaoSalvar: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  textoSalvar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fichaContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
  },
  fichaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoSalvarRotina: {
    backgroundColor: '#28a745',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  fichaGrupo: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  fichaHeaderGrupo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nomeGrupo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#856404',
  },
  itemFicha: {
    fontSize: 16,
    marginLeft: 10,
    color: '#856404',
  },
  botaoRemover: {
    padding: 4,
  },
  rotinasContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
  },
  rotinaItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rotinaInfo: {
    flex: 1,
  },
  rotinaName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rotinaDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rotinaExercises: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  rotinaActions: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoCarregar: {
    padding: 8,
    backgroundColor: '#e3f2fd',
    borderRadius: 6,
  },
  botaoExcluir: {
    padding: 8,
    backgroundColor: '#ffebee',
    borderRadius: 6,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  modalButtonSave: {
    backgroundColor: '#28a745',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalButtonTextSave: {
    color: '#fff',
  },
});
