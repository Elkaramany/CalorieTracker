import firestore from '@react-native-firebase/firestore';
import { SingleMeal } from '../../Reducers/MealsReducer';

export const AddNewMeal = async (name: string, date: Date, calories: number, uid: string) => {
    try {
        await firestore().collection('meals').doc(uid).collection('item')
            .add({
                name,
                calories,
                date,
            })
        return true
    } catch {
        return false
    }
}

export const UserMeals = async (uid: string) => {

    try {
        let tempDoc: SingleMeal[] = []

        const events = firestore().collection('meals').doc(uid).collection("item")
        await events.orderBy("date").get().then(async (querySnapshot) => {
            //@ts-ignore
            for (const query of querySnapshot._docs) {
                //@ts-ignore
                const docId = query._ref._documentPath._parts[3]

                tempDoc.push({ docId, ...query.data(), userId: uid })
            }
        })
        return tempDoc.reverse()
    } catch {
        return false
    }
}

export const DeleteSingleMeal = async (token: string, docId: string) => {
    try {
        await firestore().collection('meals').doc(token).collection('item').doc(docId).delete()
        return true
    } catch {
        return false
    }
}

export const UpdateSingleMeal = async (token: string, docId: string, title: string, calories: number, date: Date) => {
    try {
        await firestore().collection('meals').doc(token).collection('item').doc(docId).update({
            name: title,
            calories,
            date,
        })
        return true
    } catch {
        return false
    }
}

export const AllMeals = async () => {
    try {
        let tempDoc: any = []
        await firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    tempDoc.push({ userId: documentSnapshot.id, ...documentSnapshot.data() })
                });
            });

        return tempDoc;
    } catch {
        return false
    }
}