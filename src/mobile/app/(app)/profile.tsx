import { useAuth } from '@/contexts/AuthContext';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@/components/input';
import { themas } from "@/global/themes";
import { ProfileUpdates } from '@/types';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setGoal(user.goal || '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setError('');
    setMessage('');
    
    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) {
        setError('Por favor, informe sua senha atual para alterá-la.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('As novas senhas não coincidem.');
        return;
      }
      if (newPassword.length < 6) {
        setError('A nova senha deve ter pelo menos 6 caracteres.');
        return;
      }
    }
    
    setLoading(true);
    
    try {
      const updates: ProfileUpdates = {
        name,
        goal,
        ...(newPassword ? { currentPassword, newPassword } : {})
      };
      
      const success = await updateProfile(updates);
      
      if (success) {
        setMessage('Perfil atualizado com sucesso!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError('Não foi possível atualizar o perfil. Tente novamente.');
      }
    } catch (e) {
      console.error("Update error:", e);
      setError('Ocorreu um erro ao atualizar o perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <Input
            value={name}
            onChangeText={setName}
            title="NOME COMPLETO"
            IconRight={MaterialIcons}
            iconRightName="person"
          />
          
          <Input
            value={goal}
            onChangeText={setGoal}
            title="META"
            IconRight={MaterialIcons}
            iconRightName="fitness-center"
            placeholder="Ex: Ganhar massa muscular"
          />
          
          <Text style={styles.sectionTitle}>Alterar Senha (opcional)</Text>
          
          <Input
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrentPassword}
            title="SENHA ATUAL"
            IconRight={MaterialIcons}
            iconRightName={showCurrentPassword ? "visibility-off" : "visibility"}
            onIconRightPress={() => setShowCurrentPassword(!showCurrentPassword)}
          />
          
          <Input
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            title="NOVA SENHA"
            IconRight={MaterialIcons}
            iconRightName={showNewPassword ? "visibility-off" : "visibility"}
            onIconRightPress={() => setShowNewPassword(!showNewPassword)}
          />
          
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            title="CONFIRMAR NOVA SENHA"
            IconRight={MaterialIcons}
            iconRightName={showConfirmPassword ? "visibility-off" : "visibility"}
            onIconRightPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {message ? <Text style={styles.successText}>{message}</Text> : null}
          
          <TouchableOpacity 
            style={styles.updateButton} 
            onPress={handleUpdateProfile}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Atualizar Perfil</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={logout}
          >
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: themas.colors.primary,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  formContainer: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: themas.colors.primary,
    borderRadius: 40,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: themas.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
