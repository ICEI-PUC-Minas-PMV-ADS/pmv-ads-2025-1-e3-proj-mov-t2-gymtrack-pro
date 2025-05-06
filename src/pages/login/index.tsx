import React, { useState } from "react";
import {Text, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native'
import { style } from "./styles";
import logo from '../../assests/logo.png'
import {MaterialIcons, Octicons} from '@expo/vector-icons';
import { themas } from "../../global/themes";
import { Input } from "../../components/input";
import { useNavigation, NavigationProp } from '@react-navigation/native';


export default function Login() {
    const navigation = useNavigation <NavigationProp<any>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function getLogin() {
        try {
            if (!email || !password)
                return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
            
            navigation.reset({routes:[{name:"BottomRoutes"}]})

            Alert.alert('Logado com Sucesso');
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image 
                source={logo}
                style={style.logo}
                resizeMode="contain"
                />
                <Text style ={style.text}>Bora Virar Monstro.</Text>
            </View>
            <View style={style.boxMid}>
                <Input
                    value={email}
                    onChangeText={setEmail}
                    title="ENDEREÇO DE E-MAIL"
                    IconRight={MaterialIcons}
                    iconRightName="email"
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
            </View>
            <View style={style.boxbutton}>
            <TouchableOpacity style={style.button} onPress={()=>getLogin()}>
                <Text style={style.TextButton}>Conectar</Text>
            </TouchableOpacity>
            </View>
            <Text style={style.TextFinal}>Largue a preguiça cadastre-se ja!</Text>
        </View>
    )
}
