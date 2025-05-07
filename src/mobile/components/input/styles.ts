import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";



export const styles = StyleSheet.create({
    BoxInput:{
            width: '100%',
            height: 40,
            borderWidth: 1,
            borderColor: themas.colors.black,
            alignItems: 'center',
            borderRadius: 40,
            marginTop: 10,
            flexDirection: 'row',
            paddingHorizontal: 12, // Adicionado
            backgroundColor: '#fff', // Opcional, só pra destacar
        },
        input: {
            height:'100%',
            width: '90%',
            // backgroundColor:
            borderRadius: 40,
        },
        titleInput:{
            marginLeft: 5,
            color: themas.colors.black,
            marginTop:20,
        },
        icon: {
            width:'100%',
        },

})