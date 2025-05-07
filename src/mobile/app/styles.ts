import { themas } from "@/global/themes";
import { StyleSheet, Dimensions } from "react-native";

const style = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    boxTop:{
        height: Dimensions.get('window').height/3,
        width: '100%',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'

    },
    boxMid:{
        height: Dimensions.get('window').height/4,
        width: '100%',
        // backgroundColor: 'green',
        paddingHorizontal: 37,

    },
    boxbutton:{
        height: Dimensions.get('window').height/3,
        width: '100%',
        // backgroundColor: 'blue',
        alignItems: 'center',
    },
    button:{
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: themas.colors.primary,
        borderColor: themas.colors.black,
        shadowColor: "#000",
    },
    TextButton:{
        fontSize: 16,
        fontWeight: 'bold', 
        color: '#ffff'
    },
    logo:{
        height: 150,
        width: 150,
    },
    text:{
        fontWeight: 'bold',
        marginTop: 40,
        fontSize: 16,
    },
    input: {
        height:'100%',
        width: '90%',
        // backgroundColor:
        borderRadius: 40,
    },
    TextFinal:{
        fontSize: 16,
        color: themas.colors.primary,
    }
})

export default style;