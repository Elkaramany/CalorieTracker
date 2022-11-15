import React from 'react'
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

import { Colors } from '../Config'

import RegText from './RegText'

interface Props {
    text: string
    onPress: () => void
    containerStyle?: ViewStyle
    textStyle?: TextStyle
}

const Button: React.FC<Props> = ({ text, onPress, containerStyle, textStyle }) => {
    return (
        < TouchableOpacity
            onPress={() => onPress()}
            style={[styles.buttonContainer, containerStyle]} >
            <RegText str={text} style={[styles.buttonText, textStyle]} />
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(8),
        borderRadius: verticalScale(10),
        margin: verticalScale(2),
        borderColor: Colors.darkRed,
        borderWidth: scale(1),
    }, buttonText: {
        fontSize: verticalScale(18),
        fontWeight: 'bold',
        color: Colors.darkRed
    },
})

export default Button;