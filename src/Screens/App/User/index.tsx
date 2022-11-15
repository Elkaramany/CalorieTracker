import React from 'react'
import { FlatList } from 'react-native'
import {
    useSelector,
    useDispatch
} from 'react-redux'

import { Container, Header, Spinner } from '../../../Components'
import DateFilter from './DateFilter'

import { FetchAllUserMeals } from '../../../Redux/Actions'
import FoodEntry from './FoodEntry'
import { calcDayCalories, filterByDate } from './utils'


const Index: React.FC<{ navigation: any }> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { token } = useSelector((state: any) => state.AuthReducer)
    const { allMeals, loading } = useSelector((state: any) => state.MealsReducer)
    const [mealsArr, setMealsArr] = React.useState(allMeals)
    const [minDate, setMinDate] = React.useState<null | Date>(null)
    const [maxDate, setMaxDate] = React.useState(new Date())
    let [calorieDays, setCalorieDays] = React.useState<any>({})

    React.useEffect(() => {
        FetchAllUserMeals(dispatch, token)
    }, [])

    React.useEffect(() => {
        if (!allMeals.length) return;

        setMinDate(null)
        setMaxDate(new Date())
        setMealsArr(allMeals)
        setCalorieDays(calcDayCalories(allMeals))
    }, [allMeals])

    React.useEffect(() => {
        if (minDate || maxDate) setMealsArr(filterByDate(allMeals, minDate, maxDate))
    }, [minDate, maxDate])


    return (
        <Container>
            <Header headerText='All Your Meals' />
            <DateFilter
                minDate={minDate} setMinDate={setMinDate}
                maxDate={maxDate} setMaxDate={setMaxDate}
            />

            {loading ?
                <Spinner size={true} />
                :
                <FlatList
                    data={mealsArr}
                    keyExtractor={item => `${item.docId}`}
                    renderItem={({ item, index }) => <FoodEntry item={item} index={index} allMeals={mealsArr} calorieDays={calorieDays} navigation={navigation} />}
                />
            }
        </Container>
    )
}

export default Index;