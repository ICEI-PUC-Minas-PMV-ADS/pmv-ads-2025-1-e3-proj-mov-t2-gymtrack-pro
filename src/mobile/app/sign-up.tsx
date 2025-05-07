import { useAuth } from '@/contexts/AuthContext';
import { Text, View, Image, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import style  from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Input } from '@/components/input';
import { router } from 'expo-router';

export default function SignUp() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setError('');
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!name || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const success = await register(name, email, password);
      if (success) {
        Alert.alert('Sucesso!', 'Cadastro realizado com sucesso. Você pode fazer login agora.');
        router.replace('/sign-in');
      } else {
        setError('Falha ao realizar o cadastro. Tente novamente.');
      }
    } catch (e) {
      console.error("Registration error:", e);
      setError('Ocorreu um erro inesperado durante o cadastro.');
    }
  };

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image 
          source={require('../assets/images/logo.png')}
          style={style.logo}
          resizeMode="contain"
        />
        <Text style={style.text}>Crie sua Conta Monstro.</Text>
      </View>

      <ScrollView
        style={style.scrollView}
        contentContainerStyle={style.scrollViewContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={style.formInputWrapper}>
          <Input
            value={name}
            onChangeText={setName}
            title="NOME COMPLETO"
            IconRight={MaterialIcons}
            iconRightName="person"
          />
          <Input
            value={email}
            onChangeText={setEmail}
            title="ENDEREÇO DE E-MAIL"
            IconRight={MaterialIcons}
            iconRightName="email"
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            title="SENHA"
            IconRight={MaterialIcons}
            iconRightName={showPassword ? "visibility-off" : "visibility"}
            onIconRightPress={() => setShowPassword(!showPassword)}
          />
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            title="CONFIRMAR SENHA"
            IconRight={MaterialIcons}
            iconRightName={showConfirmPassword ? "visibility-off" : "visibility"}
            onIconRightPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          {error ? <Text style={style.errorText}>{error}</Text> : null}
        </View>

        <View style={style.formButtonWrapper}>
          <TouchableOpacity style={style.button} onPress={handleSignUp}>
            <Text style={style.TextButton}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.replace('/sign-in')} style={style.signInLink}>
          <Text style={style.TextFinal}>Já tem uma conta? Faça login!</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
