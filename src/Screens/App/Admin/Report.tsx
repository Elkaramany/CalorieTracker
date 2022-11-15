import React from 'react'
import { View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import { Container, Header, RegText, Spinner } from '../../../Components'
import { GlobalStyles } from '../../../Config'
import { getAllMeals } from './utils'

const Report: React.FC<{}> = () => {
    const { allUsers, loading } = useSelector((state: any) => state.MealsReducer)
    const [data, setData] = React.useState<any>([])

    React.useEffect(() => {
        fetchAndCalculate()
    }, [allUsers])

    const fetchAndCalculate = async () => {
        let arr = await getAllMeals(allUsers)
        setData(arr)
    }

    const getAverage = (uid: string) => Math.floor(data[2][uid][1] / data[2][uid][0])

    return (
        <Container>
            <Header headerText='Reports' />
            {loading ?
                <Spinner />
                :
                <>
                    {data.length === 0 ?
                        <RegText str='No data to display' />
                        :
                        <View>
                            <RegText str={`Entries in the last 7 days: ${data[0]}`} />
                            <RegText str={`Entries in the week before that: ${data[1]}`} />

                            <View style={GlobalStyles.horizontalLine} />

                            <RegText str={`Average calories per each user in the last 7 days:`} />

                            <View style={GlobalStyles.horizontalLine} />

                            <FlatList
                                data={Object.keys(data[2])}
                                keyExtractor={item => `${item}`}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <RegText str={`${item}:`} />
                                            <RegText str={`Average: ${getAverage(item)}`} />
                                            <RegText str={JSON.stringify(data[2][item])} />

                                            <View style={GlobalStyles.horizontalLine} />
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    }
                </>

            }
        </Container>
    )
}

export default Report;