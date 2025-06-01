import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [fichaSalva, setFichaSalva] = useState<
    { grupo: string; exercicios: { nome: string; series: string }[] }[]
  >([]);

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

    const exercicios = gruposMusculares[grupoSelecionado];

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
      <Text style={styles.titulo}>Montar Ficha de Treino</Text>

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
            gruposMusculares[grupoSelecionado].map((item, index) => (
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
          <Text style={styles.subtitulo}>Ficha Montada:</Text>
          {fichaSalva.map((ficha, index) => (
            <View key={index} style={styles.fichaGrupo}>
              <View style={styles.fichaHeader}>
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
  fichaGrupo: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  fichaHeader: {
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
});
