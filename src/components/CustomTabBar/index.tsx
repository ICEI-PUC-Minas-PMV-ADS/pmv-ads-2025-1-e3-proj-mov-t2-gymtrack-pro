import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themes";

export default ({state, navigation}) => {
    
    const go = (screenName:string)=>{
        navigation.navigate(screenName)
    }

    return (
        <View style={styles.tabArea}>
            <TouchableOpacity style={styles.tabItem} onPress={()=>go("List")}>
                <AntDesign
                    name="bars"
                    style={{opacity:state.index === 0?1:0.3,color:themas.colors.primary,fontSize:32}}
                />
            </TouchableOpacity>
                
            <TouchableOpacity style={styles.tabItemButtom}>
                <View style={{width:'100%',left:10,top:4}}>
                    <Entypo
                        name="plus"
                        size={40}
                        color={"#fff"}                    
                    />
                </View>
                <View style={{flexDirection: 'row-reverse', width:'100%',right:10,bottom:10}}>
                    <MaterialIcons
                        name="edit"
                        color={"#fff"}
                        size={40}                    
                    />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={()=>go("User")}>
                <FontAwesome
                   name="user"
                   style={{opacity:state.index === 1?1:0.3,color:themas.colors.primary,fontSize:32}}
                />
            </TouchableOpacity>
        </View>
    )
}
