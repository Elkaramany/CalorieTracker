import { scale, verticalScale } from 'react-native-size-matters';
import { Platform, StyleSheet, Dimensions } from 'react-native';

const IOS: boolean = Platform.OS === 'ios';
const ANDROID: boolean = Platform.OS === 'android';
const WIDTH: number = Dimensions.get('window').width
const HEIGHT: number = Dimensions.get('window').height
const CALORIE_THRESHOLD = 2100

const Colors = {
    primary: '#FFFFFF',
    secondary: '#000000',
    darkRed: "#EE0979",
    brightRed: '#FF6A00',
    inputGray: "#afafaf",
    lineGray: "#b6b6b6",
    gray: "#CCCCCC",
    blue: "#0E94F6",
}

const GlobalStyles = StyleSheet.create({
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowAround: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }, regularText: {
        fontSize: scale(20),
        color: Colors.secondary
    }, bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: verticalScale(15),
    }, horizontalLine: {
        alignSelf: 'center',
        backgroundColor: Colors.lineGray,
        height: scale(2),
        width: '100%',
        marginVertical: verticalScale(15),
    },
})

export { Colors, GlobalStyles, IOS, ANDROID, WIDTH, HEIGHT, CALORIE_THRESHOLD };