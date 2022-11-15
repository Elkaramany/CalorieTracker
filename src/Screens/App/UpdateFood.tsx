import React from 'react'
import { View } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { useSelector, useDispatch } from 'react-redux'

import { Container, Button, Spinner, HeaderArrow } from '../../Components'

import { formatDate, GlobalStyles, validateMealDetails } from '../../Config'
import { UpdateMeal } from '../../Redux/Actions'
import FoodDetails from './FoodDetails'


const AddFood: React.FC<{ route: any }> = ({ route }) => {
    const { item } = route.params
    const dispatch = useDispatch()
    const [date, setDate] = React.useState(new Date(formatDate(item.date)))
    const [title, setTitle] = React.useState(item.name)
    const [calories, setCalories] = React.useState(item.calories.toString())
    const [loading, setLoading] = React.useState(false)
    const { token } = useSelector((state: any) => state.AuthReducer)
    let selectedToken = item.userId ? item.userId : token

    const onSubmit = async () => {
        if (!validateMealDetails(title, calories)) return;
        setLoading(true)

        await UpdateMeal(dispatch, selectedToken, item.docId, title, Number(calories), date)

        setLoading(false)

    }

    return (
        <Container>
            <HeaderArrow headerText='Update Meal' headerStyle={{ marginBottom: verticalScale(20) }} />

            <FoodDetails
                title={title}
                setTitle={setTitle}
                calories={calories}
                setCalories={setCalories}
                date={date}
                setDate={setDate}
            />

            <View style={GlobalStyles.bottomContainer}>
                {loading ?
                    <Spinner />
                    :
                    <Button text='Update' onPress={() => onSubmit()} />
                }
            </View>
        </Container>
    )
}

export default AddFood;