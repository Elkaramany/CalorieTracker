import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-date-picker'

import { RegText } from '../../../Components'

import { Colors, getDayOnly, GlobalStyles, WIDTH } from '../../../Config'

interface Props {
    minDate: Date | null
    setMinDate: (val: Date) => void
    maxDate: Date
    setMaxDate: (val: Date) => void
}

const Index: React.FC<Props> = ({ minDate, setMinDate, maxDate, setMaxDate }) => {
    const [showMinDate, setShowMinDate] = React.useState(false)
    const [showMaxDate, setShowMaxDate] = React.useState(false)

    const addDay = (date: Date, min: boolean) => {
        let d = new Date(date)
        d.setDate(d.getDate() + 1)
        //set the hours at the day start or the day's end to make better comparisons
        if (min) d.setHours(-22, 0, 0, 0)
        else d.setHours(0, 0, 0, 0)
        return d
    }

    return (
        <>
            <View style={GlobalStyles.rowBetween}>
                <View style={{ width: WIDTH * 0.4 }}>
                    <TouchableOpacity onPress={() => setShowMinDate(true)}>
                        <RegText str={"Select Date From:"} style={{ color: Colors.darkRed }} />

                        {minDate && <RegText str={getDayOnly(minDate)} />}
                    </TouchableOpacity>
                    <DatePicker
                        mode={'date'}
                        modal
                        open={showMinDate}
                        date={minDate ? minDate : new Date()}
                        maximumDate={new Date()}
                        onConfirm={(date) => {
                            setShowMinDate(false)
                            setMinDate(addDay(date, true))
                        }}
                        onCancel={() => {
                            setShowMinDate(false)
                        }}
                    />
                </View>

                <View>
                    <TouchableOpacity onPress={() => setShowMaxDate(true)}>
                        <RegText str={"Select Date To:"} style={{ color: Colors.darkRed }} />

                        <RegText str={getDayOnly(maxDate)} />
                    </TouchableOpacity>
                    <DatePicker
                        mode={'date'}
                        modal
                        open={showMaxDate}
                        date={maxDate}
                        maximumDate={new Date()}
                        onConfirm={(date) => {
                            setShowMaxDate(false)
                            setMaxDate(addDay(date, false))
                        }}
                        onCancel={() => {
                            setShowMaxDate(false)
                        }}
                    />
                </View>
            </View>

            <View style={GlobalStyles.horizontalLine} />
        </>
    )
}

export default Index;