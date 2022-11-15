import React from 'react'
import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { CredentialMeals, FetchAllUserMeals } from '../../../Redux/Actions'

import { Container, HeaderArrow, Spinner, RegText, Button } from '../../../Components'
import FoodEntry from '../User/FoodEntry'

interface Props {
    route: any
    navigation: any
}

const UserEntries: React.FC<Props> = ({ route, navigation }) => {
    const { allMeals, loading } = useSelector((state: any) => state.MealsReducer)
    const { item } = route.params
    const { name, userId } = item
    const dispatch = useDispatch()

    React.useEffect(() => {
        FetchAllUserMeals(dispatch, userId)

        return () => CredentialMeals(dispatch, { prop: 'allMeals', value: [] })
    }, [])

    return (
        <Container>
            <HeaderArrow headerText={name} />
            {loading ?
                <Spinner size={true} />
                :
                <>
                    <Button text='Create new entry for this user'
                        onPress={() => navigation.navigate("AddFoodAdmin", { userId })}
                    />
                    <FlatList
                        data={allMeals}
                        keyExtractor={item => `${item.docId}`}
                        renderItem={({ item, index }) => {
                            return (
                                <FoodEntry
                                    item={item}
                                    index={index}
                                    allMeals={allMeals}
                                    calorieDays={null}
                                    navigation={navigation}
                                    userId={userId}
                                />
                            )
                        }}
                        ListEmptyComponent={() => <RegText str='No entries found for this user' />}
                    />
                </>
            }
        </Container>
    )
}

export default UserEntries;