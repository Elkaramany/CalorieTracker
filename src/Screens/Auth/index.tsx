import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { GlobalStyles, Colors, HEIGHT } from '../../Config/Constants';

import { validateEmailPassword } from '../../Config';
import { TryLogin } from '../../Redux/Actions';

import { Container, RegText, Header, Button, Spinner } from '../../Components';
import EmailPassword from './EmailPassword'

interface Props {
    navigation: any,
}

const Index: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { email, password } = useSelector((state: any) => state.AuthReducer)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        if (!validateEmailPassword(email, password)) return;

        setLoading(true)

        await TryLogin(dispatch, email, password)

        setLoading(false)
    }

    return (
        <Container>
            <View style={{ flex: 1 }}>
                <Header headerText='Calorie Tracker' />

                <EmailPassword />

                <View style={{ height: HEIGHT * 0.2 }}>
                    {loading ?
                        <Spinner />
                        :
                        <Button text={"Login"} onPress={() => onLogin()} />
                    }
                </View>


                <View style={GlobalStyles.rowCenter}>
                    <RegText str={"Don't have an account?"} />
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <RegText str={" SignUp"} style={{ color: Colors.brightRed }} />
                    </TouchableOpacity>
                </View>
            </View>

        </Container>
    )
}

export default Index