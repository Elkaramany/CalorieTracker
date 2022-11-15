import React from 'react';
import { Alert, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { verticalScale } from 'react-native-size-matters';

import { GlobalStyles, validateEmailPassword, validateName } from '../../Config';
import { Credential, TrySignUp } from '../../Redux/Actions';

import { Container, RadioBtn, HeaderArrow, Button, Input, Spinner } from '../../Components';
import EmailPassword from './EmailPassword'

interface Props {
    navigation: any,
}

const Index: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const { userType, email, password, name } = useSelector((state: any) => state.AuthReducer)

    const onSuccessLogin = () => {
        Alert.alert(
            "Sign Up Success",
            "Please login",
            [
                { text: "OK", onPress: () => navigation.goBack() }
            ]
        );
    }

    const onSignUp = async () => {
        if (!validateEmailPassword(email, password)) return;
        if (!validateName(name)) {
            Alert.alert("Please provide a valid name")

            return;
        }

        setLoading(true)

        await TrySignUp(email, password, name, userType, () => onSuccessLogin())

        setLoading(false)
    }


    return (
        <Container>
            <View style={{ flex: 1 }}>
                <HeaderArrow
                    headerText='Create new account'
                    headerStyle={{ alignSelf: 'center' }}
                />

                <EmailPassword />
                <Input
                    label='Your Name'
                    value={name}
                    onChangeText={(value) => Credential(dispatch, { prop: "name", value })}
                />

                <View style={[GlobalStyles.rowAround, { marginVertical: verticalScale(20) }]}>
                    <RadioBtn
                        text='User'
                        selected={userType === "User"}
                        onPress={() => Credential(dispatch, { prop: "userType", value: "User" })}
                    />

                    <RadioBtn
                        text='Admin'
                        selected={userType === "Admin"}
                        onPress={() => Credential(dispatch, { prop: "userType", value: "Admin" })}
                    />
                </View>

                {loading ?
                    <Spinner />
                    :
                    <Button text={"SignUp"} onPress={() => onSignUp()} />
                }


            </View>

        </Container>
    )
}

export default Index