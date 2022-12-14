import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { scale } from 'react-native-size-matters'
import RegText from './RegText'
import { Colors } from '../Config'

interface Props {
    onPress: () => void
    selected: boolean
    text: string
}

const RadioBtn: React.FC<Props> = ({ onPress = () => { }, selected, text }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress()}>
            <View style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selected ? Colors.secondary : Colors.primary
            }} />

            <RegText str={text} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default RadioBtn