import { StyleSheet } from "react-native"
import { scale, verticalScale } from "react-native-size-matters"
import { GlobalStyles, IOS } from "../../Config"

const ICON_WIDTH = 30
const ICON_HEIGHT = 30

const styles = StyleSheet.create({
    bottomTabContainer: {
        ...GlobalStyles.centeredContainer,
        top: IOS ? verticalScale(7) : 0,
        padding: verticalScale(5),
    },
    tabText: {
        ...GlobalStyles.regularText,
        fontSize: scale(12),
        marginTop: scale(3)
    }, tabIcon: {
        height: scale(15),
        width: scale(15)
    }
})

export { styles, ICON_HEIGHT, ICON_WIDTH }