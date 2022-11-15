import { Alert } from 'react-native';
import { Login, SignUp } from './Firebase/Auth'

interface Cred {
    prop: string
    value: number | object | string | null | boolean
}


export const Credential = (dispatch: any, cred: Cred) => {
    dispatch({
        type: 'Credential_In',
        payload: { prop: cred.prop, value: cred.value },
    });
}

export const TryLogin = async (dispatch: any, email: string, password: string) => {
    const val = await Login(email, password)

    if (val) {
        Credential(dispatch, { prop: "token", value: val.uid })
        Credential(dispatch, { prop: "userType", value: val.userType })
        Credential(dispatch, { prop: "name", value: val.name })
    }
    else Alert.alert("Error Logging in")
}

export const TrySignUp = async (email: string, password: string, name: string, userType: string, successNavigation: () => void) => {

    const value = await SignUp(email, password, name, userType)

    if (value) successNavigation()
    else Alert.alert("Error signing up")
}

export const ResetAuthReducer = (dispatch: any) => dispatch({ type: 'RESET' });