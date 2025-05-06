import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";



export const styles = StyleSheet.create({
    tabArea:{
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-around'
    },
    tabItem:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItemButtom:{
        width:70,
        height:70,
        borderRadius:35,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:9999,
        top:-30,
        backgroundColor:themas.colors.gray
    }
    
})