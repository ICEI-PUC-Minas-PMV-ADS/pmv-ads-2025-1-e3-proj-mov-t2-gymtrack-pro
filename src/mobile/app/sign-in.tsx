import { useAuth } from '@/contexts/AuthContext';
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import style  from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Input } from '@/components/input';
import { router } from 'expo-router';

export default function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Email ou senha inválidos.');
      }
    } catch (e) {
      console.error('Login error:', e);
      setError('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
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
        <Text style={style.text}>Bora Virar Monstro.</Text>
      </View>
      <View style={style.boxMid}>
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
        {error ? <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text> : null}
      </View>
      <View style={style.boxbutton}>
        <TouchableOpacity 
          style={style.button} 
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={style.TextButton}>Conectar</Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.push('/sign-up')}>
        <Text style={style.TextFinal}>Largue a preguiça cadastre-se ja!</Text>
      </TouchableOpacity>
    </View>
  );
}
