import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Calendario() {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const dados = await AsyncStorage.getItem('treinos');
    if (dados) {
      setMarkedDates(JSON.parse(dados));
    }
  };

  const salvarDados = async (dados) => {
    await AsyncStorage.setItem('treinos', JSON.stringify(dados));
  };

  const aoSelecionarDia = (day) => {
    const date = day.dateString;
    const currentMark = markedDates[date];

    const novoMarked = { ...markedDates };

    if (!currentMark) {
      // Marcar como PRESENÇA (verde)
      novoMarked[date] = {
        customStyles: {
          container: {},
          text: { color: 'green', fontWeight: 'bold' },
        },
      };
    } else if (currentMark?.customStyles?.text?.color === 'green') {
      // Trocar para FALTA (vermelho)
      novoMarked[date] = {
        customStyles: {
          container: {},
          text: { color: 'red', fontWeight: 'bold' },
        },
      };
    } else if (currentMark?.customStyles?.text?.color === 'red') {
      // Desmarcar (remover)
      delete novoMarked[date];
    }

    setMarkedDates(novoMarked);
    salvarDados(novoMarked);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calendário de Treinos</Text>
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
    paddingTop: 60,
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
