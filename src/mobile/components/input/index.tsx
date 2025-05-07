import React, { forwardRef, Fragment, LegacyRef } from "react";
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { themas } from "../../global/themes";
import {MaterialIcons, FontAwesome, Octicons} from '@expo/vector-icons';

type IconComponents = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
                    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
                    React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props =TextInputProps & {
    IconLeft?: IconComponents,
    IconRight?: IconComponents,
    iconLeftName?: string,
    iconRightName?: string,
    title?: string,
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void,
}

export const Input = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {
    const { IconLeft, IconRight, iconLeftName, iconRightName, title, onIconLeftPress, onIconRightPress, ...rest } = Props

    return (
        <Fragment>
            <Text style={styles.titleInput}>{title}</Text>
            <View style={styles.BoxInput}>
    {IconLeft && iconLeftName && (
        <TouchableOpacity>
            <IconLeft name={iconLeftName as any} size={20} color={themas.colors.gray} style={styles.icon} />
        </TouchableOpacity>
    )}
    <TextInput 
        ref={ref}
        style={styles.input}
        {...rest}
    />
    {IconRight && iconRightName && (
        <TouchableOpacity onPress={onIconRightPress}>
            <IconRight name={iconRightName as any} size={20} color={themas.colors.gray} style={styles.icon} />
        </TouchableOpacity>
    )}
</View>
        </Fragment>
    )
})
