import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const Login = async (email: string, password: string) => {
    let val = await auth().signInWithEmailAndPassword(email, password)
    if (!val) return false
    let user = await firestore().collection('users').doc(val.user.uid).get()

    if (!user) return false

    //@ts-ignore
    return { uid: val.user.uid, name: user._data.name, userType: user._data.userType }
}

export const SignUp = async (email: string, password: string, name: string, userType: string) => {
    try {
        await auth().createUserWithEmailAndPassword(email, password).then(async (val) => {
            await firestore().collection('users').doc(val.user.uid)
                .set({
                    name,
                    userType
                })
        })
        return true
    } catch {
        return false
    }
}