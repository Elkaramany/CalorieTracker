import React from 'react'
import { View, Alert } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { useSelector, useDispatch } from 'react-redux'

import { SingleMeal } from '../../../Redux/Reducers/MealsReducer'
import { formatDate, getDate, CALORIE_THRESHOLD, Colors, GlobalStyles, WIDTH } from '../../../Config'

import { Button, RegText, Spinner } from '../../../Components'
import { DeleteMeal } from '../../../Redux/Actions'

interface Props {
    item: SingleMeal
    allMeals: SingleMeal[]
    index: number
    calorieDays: any
    navigation: any
    userId?: null | string
}

const FoodEntry: React.FC<Props> = ({ item, allMeals, index, calorieDays, navigation, userId }) => {
    const { token, userType } = useSelector((state: any) => state.AuthReducer)
    //to manage admin and users
    let selectedToken = userId ? userId : token
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)

    const showAllCalories = () => {
        let caloriesForWeek = calorieDays[getDate(item.date)]
        let hasExceeded = caloriesForWeek > CALORIE_THRESHOLD
        if ((index === 0 || getDate(item.date) !== getDate(allMeals[index - 1].date)) && caloriesForWeek) {
            return (
                <View>
                    <RegText str={`Calories consumed in ${getDate(item.date)}:`} style={{ color: Colors.brightRed }} />
                    <View style={GlobalStyles.rowAround}>
                        <RegText str={`${caloriesForWeek}`}
                            style={{ color: hasExceeded ? Colors.darkRed : Colors.blue }}
                        />

                        {hasExceeded &&
                            <RegText str='EXCEEDED THRESHOLD' style={{ color: Colors.darkRed }} />
                        }
                    </View>


                    <View style={GlobalStyles.horizontalLine} />
                </View>
            )
        }
    }

    const confirmDelete = () => {
        Alert.alert(
            "Delete meal",
            "Are you sure you want to delete this meal",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteMeal() }
            ]
        );

    }

    const deleteMeal = async () => {
        setLoading(false)

        await DeleteMeal(dispatch, selectedToken, item.docId.toString())

        setLoading(true)
    }

    return (
        <View style={{ borderColor: Colors.gray, }}>
            {calorieDays && showAllCalories()}

            <RegText str={`Name: ${item.name}`} />
            <RegText str={`Calories: ${item.calories}`} />
            <RegText str={`Date: ${formatDate(item.date)}`} />

            {loading ?
                <Spinner />
                :
                <View style={[GlobalStyles.rowBetween, { marginVertical: verticalScale(10) }]}>
                    <Button
                        text='Update'
                        onPress={() => navigation.navigate("UpdateFood", { item: { ...item, userId: selectedToken } })}
                        containerStyle={{ width: WIDTH * 0.4 }}
                    />

                    <Button
                        text='Delete'
                        onPress={() => confirmDelete()}
                        containerStyle={{ width: WIDTH * 0.4 }}
                    />
                </View>
            }

            <View style={GlobalStyles.horizontalLine} />
        </View>
    )
}

export default FoodEntry;