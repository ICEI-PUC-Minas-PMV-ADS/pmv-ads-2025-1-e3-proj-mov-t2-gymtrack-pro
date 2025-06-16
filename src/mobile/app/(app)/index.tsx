import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import UserSelector from '@/components/UserSelector';

const API_URL = __DEV__ ? 'http://localhost:3000' : 'https://production-api.com';

export default function Dashboard() {
  const { user } = useAuth();
  const [presencas, setPresencas] = useState(0);
  const [faltas, setFaltas] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('');

  const isAdmin = user?.role === 'ADMIN';

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        try {
          // Se for admin e tiver selecionado um usuário, carregar dados da API
          if (isAdmin && selectedUserId) {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
              const response = await fetch(`${API_URL}/api/v1/attendance?userId=${selectedUserId}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });

              if (response.ok) {
                const data = await response.json();
                let countPresencas = 0;
                let countFaltas = 0;

                data.attendances.forEach((attendance: any) => {
                  if (attendance.present) {
                    countPresencas += 1;
                  } else {
                    countFaltas += 1;
                  }
                });

                setPresencas(countPresencas);
                setFaltas(countFaltas);
                setTotal(countPresencas + countFaltas);
                return;
              }
            }
          }

          // Carregar dados locais (para usuário próprio ou fallback)
          const dados = await AsyncStorage.getItem('treinos');
          if (dados) {
            const marcacoes = JSON.parse(dados);

            let countPresencas = 0;
            let countFaltas = 0;

            Object.values(marcacoes).forEach((item: any) => {
              const cor = item?.customStyles?.text?.color;
              if (cor === 'green') {
                countPresencas += 1;
              } else if (cor === 'red') {
                countFaltas += 1;
              }
            });

            setPresencas(countPresencas);
            setFaltas(countFaltas);
            setTotal(countPresencas + countFaltas);
          } else {
            setPresencas(0);
            setFaltas(0);
            setTotal(0);
          }
        } catch (error) {
          console.log('Erro ao carregar dados:', error);
        }
      };

      carregarDados();
    }, [selectedUserId, isAdmin])
  );

  const calcularPorcentagem = (quantidade: number) => {
    if (total === 0) return '0%';
    const porcentagem = (quantidade / total) * 100;
    return `${porcentagem.toFixed(0)}%`;
  };

  return (
    <View style={styles.container}>
      {isAdmin && (
        <UserSelector
          selectedUserId={selectedUserId}
          onUserSelect={(userId, userName) => {
            setSelectedUserId(userId);
            setSelectedUserName(userName);
          }}
        />
      )}

      <Text style={styles.titulo}>
        {isAdmin && selectedUserId 
          ? `📊 Dashboard - ${selectedUserName}`
          : '📊 Dashboard - Estatísticas'
        }
      </Text>

      <View style={styles.card}>
        <MaterialIcons name="bar-chart" size={24} color="#333" />
        <Text style={styles.cardTitulo}>Resumo Geral</Text>

        <View style={styles.linha}>
          <Text style={styles.label}>Total de Registros:</Text>
          <Text style={styles.valor}>{total}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <MaterialIcons name="check-circle" size={24} color="green" />
        <Text style={[styles.cardTitulo, { color: 'green' }]}>Presenças</Text>

        <View style={styles.linha}>
          <Text style={styles.label}>Quantidade:</Text>
          <Text style={[styles.valor, { color: 'green' }]}>{presencas}</Text>
        </View>
        <View style={styles.linha}>
          <Text style={styles.label}>Porcentagem:</Text>
          <Text style={[styles.valor, { color: 'green' }]}>
            {calcularPorcentagem(presencas)}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <MaterialIcons name="cancel" size={24} color="red" />
        <Text style={[styles.cardTitulo, { color: 'red' }]}>Faltas</Text>

        <View style={styles.linha}>
          <Text style={styles.label}>Quantidade:</Text>
          <Text style={[styles.valor, { color: 'red' }]}>{faltas}</Text>
        </View>
        <View style={styles.linha}>
          <Text style={styles.label}>Porcentagem:</Text>
          <Text style={[styles.valor, { color: 'red' }]}>
            {calcularPorcentagem(faltas)}
          </Text>
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
    backgroundColor: '#f0f4f7',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
