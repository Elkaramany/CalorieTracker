import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { NUTRITIONIX_URL, NUTRITIONIX_APP_ID, NUTRITIONIX_APP_KEY } from "@env"
import { scale, verticalScale } from 'react-native-size-matters'

import { Colors } from '../Config'

import Input from './Input'
import RegText from './RegText'

interface Props {
    title: string
    setTitle: (val: string) => void
    calories: string
    setCalories: (val: string) => void
}

const headers = {
    "x-app-id": NUTRITIONIX_APP_ID,
    "x-app-key": NUTRITIONIX_APP_KEY,
}

const Suggestions: React.FC<Props> = ({ title, setTitle, calories, setCalories }) => {
    const [suggestionsList, setSuggestionsList] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (!title.length) {
            setSuggestionsList([])
            return;
        }

        let interval: any = null;
        getSuggestionsFromnNutritionix(interval)

        return () => clearTimeout(interval)
    }, [title])

    const getSuggestionsFromnNutritionix = async (interval: any) => {
        interval = setTimeout(async () => {
            await axios({
                method: 'get',
                url: `${NUTRITIONIX_URL}search/instant?query=${title}`,
                headers,
            }).then((res) => {
                setSuggestionsList(res.data.common)
            })
        }, 500)
    }

    const getCaloriesFromNutritionix = async (val: string) => {
        let cals = ""
        await axios({
            method: 'post',
            url: `${NUTRITIONIX_URL}natural/nutrients`,
            data: { query: val },
            headers,
        }).then((res) => {
            cals = res.data.foods[0].nf_calories.toString()
        })

        return cals
    }

    const isChosen = () => {
        if (!title.length) return false

        let arr: any[] = suggestionsList.slice(0, 5)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].tag_name === title) return true
        }
        return false
    }

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity
                key={item.tag_id}
                onPress={async () => {
                    setLoading(true)
                    let cals = await getCaloriesFromNutritionix(item.tag_name)
                    setTitle(item.tag_name)
                    setCalories(cals)
                    setLoading(false)
                }}>
                <RegText str={item.tag_name} style={styles.sugColor} />
            </TouchableOpacity>
        )
    }

    const renderSuggestions = () => {
        if (suggestionsList.length > 0 && !isChosen()) {
            return suggestionsList.slice(0, 5).map((item, index) => {
                return <View key={index}>{renderItem(item)}</View>
            })
        } else return <View />
    }

    return (
        <View>
            <Input
                label='Meal Name'
                value={title}
                onChangeText={(value) => setTitle(value)}
            />

            {renderSuggestions()}

            {!loading &&
                <Input
                    label='Number of calories'
                    type={'numeric'}
                    value={calories}
                    onChangeText={(value) => setCalories(value)}
                />
            }

        </View>
    )

}

const styles = StyleSheet.create({
    sugColor: {
        color: Colors.brightRed,
        marginVertical: verticalScale(5),
        backgroundColor: Colors.gray,
        padding: scale(5),
    }
})
export default Suggestions;