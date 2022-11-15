import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { FetchAllMeals } from '../../../Redux/Actions'

import { Container, RegText, Header, Spinner } from '../../../Components'
import { SingleUser } from '../../../Redux/Reducers/MealsReducer'
import { GlobalStyles } from '../../../Config'

interface Props {
    navigation: any
}

const Index: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { allUsers, loading } = useSelector((state: any) => state.MealsReducer)

    React.useEffect(() => {
        FetchAllMeals(dispatch)
    }, [])

    const renderItem = (item: SingleUser) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("UserEntries", { item })}>
                <RegText str={`Name: ${item.name}`} />
                <RegText str={`uid: ${item.userId}`} />
                <View style={GlobalStyles.horizontalLine} />
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <Header headerText='All Users' />

            {loading ?
                <Spinner />
                :
                <FlatList
                    data={allUsers}
                    keyExtractor={item => `${item.userId}`}
                    renderItem={({ item }) => renderItem(item)}
                    ListEmptyComponent={() => <RegText str='No users found' />}
                />
            }
        </Container>
    )
}

export default Index;