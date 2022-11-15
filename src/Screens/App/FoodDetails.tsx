import React from 'react'
import { View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { scale, verticalScale } from 'react-native-size-matters'

import { RegText, Button, Input, Suggestions } from '../../Components'

import { Colors } from '../../Config'

interface Props {
    title: string
    setTitle: (val: string) => void
    date: Date
    setDate: (val: Date) => void
    calories: string
    setCalories: (val: string) => void
}

const FoodDetails: React.FC<Props> = ({ title, setTitle, date, setDate, calories, setCalories }) => {
    const [dateShow, setDateShow] = React.useState(false)

    return (
        <View>
            <Button
                text='Change Date and Time'
                onPress={() => setDateShow(true)}
                containerStyle={{ borderColor: Colors.blue }}
                textStyle={{ color: Colors.blue }}
            />
            <RegText str={`Date: ${date.toString()}`} style={{ marginVertical: verticalScale(10), fontSize: scale(15) }} />
            <DatePicker
                modal
                open={dateShow}
                date={date}
                maximumDate={new Date()}
                onConfirm={(date) => {
                    setDateShow(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setDateShow(false)
                }}
            />

            <Suggestions title={title} setTitle={setTitle} calories={calories} setCalories={setCalories} />

        </View>
    )
}

export default FoodDetails;