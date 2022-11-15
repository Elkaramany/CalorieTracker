import React from 'react'
import { View, Alert } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { useSelector, useDispatch } from 'react-redux'

import { Container, Header, Button, Spinner, HeaderArrow } from '../../Components'

import { GlobalStyles, validateMealDetails } from '../../Config'
import { AddNewMeal } from '../../Redux/Actions/Firebase/DB'
import { FetchAllUserMeals } from '../../Redux/Actions'
import FoodDetails from './FoodDetails'


interface Props {
    route: any
}

const AddFood: React.FC<Props> = ({ route }) => {
    const userId = route?.params?.userId
    const dispatch = useDispatch()
    const [date, setDate] = React.useState(new Date())
    const [title, setTitle] = React.useState("")
    const [calories, setCalories] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const { token } = useSelector((state: any) => state.AuthReducer)
    let selectedToken = userId ? userId : token

    const onSubmit = async () => {
        if (!validateMealDetails(title, calories)) return;

        setLoading(true)

        const val = await AddNewMeal(title, date, Number(calories), selectedToken)

        if (val) {
            setTitle("")
            setCalories("")
            setDate(new Date())
            Alert.alert("Meal added successfully")
            FetchAllUserMeals(dispatch, selectedToken)
        } else {
            Alert.alert("Error adding new meal")
        }

        setLoading(false)

    }

    return (
        <Container>
            {userId ?
                <HeaderArrow headerText='Add Meal for user' />
                :
                <Header headerText='Add New Meal' headerStyle={{ marginBottom: verticalScale(20) }} />
            }

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
                    <Button text='Add' onPress={() => onSubmit()} />
                }
            </View>
        </Container>
    )
}

export default AddFood;