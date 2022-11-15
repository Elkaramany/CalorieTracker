import React from 'react'
import { View } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'

import { Credential } from '../../Redux/Actions'

import { Input } from '../../Components'


const EmailPassword: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const { email, password } = useSelector((state: any) => state.AuthReducer)

    return (
        <View style={{ marginTop: verticalScale(50) }}>
            <Input
                label='Email'
                value={email}
                onChangeText={(value) => Credential(dispatch, { prop: "email", value })}
            />
            <Input
                label='Password'
                value={password}
                onChangeText={(value) => Credential(dispatch, { prop: "password", value })}
                secureTextEntry
            />
        </View>
    )
}


export default EmailPassword;