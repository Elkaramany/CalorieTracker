import React from 'react';
import { Text, Image, ViewStyle, TextStyle, StyleSheet, TouchableOpacity, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import { LeftArrow, GlobalStyles, Colors, WIDTH } from '../Config';

interface Props {
    headerStyle?: ViewStyle;
    textStyle?: TextStyle;
    headerText?: string;
    imageName?: string;
    onSkip?: () => void
}

const HeaderArrow: React.FC<Props> = ({ headerText, headerStyle, textStyle }) => {
    const navigation = useNavigation()

    return (
        <View
            style={[styles.headerContainer, headerStyle, GlobalStyles.rowBetween]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <LeftArrow height={40} width={40} fill={Colors.secondary} />
            </TouchableOpacity >
            <Text style={[styles.headerTextStyle, textStyle]}>
                {headerText}
            </Text>
            <View />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: WIDTH * 0.95
    }, headerTextStyle: {
        color: Colors.darkRed,
        fontSize: verticalScale(25),
        fontWeight: 'bold'
    },
})

export default HeaderArrow;