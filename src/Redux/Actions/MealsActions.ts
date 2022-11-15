import { Alert } from "react-native";
import { SingleMeal } from "../Reducers/MealsReducer";
import { AllMeals, DeleteSingleMeal, UpdateSingleMeal, UserMeals } from "./Firebase/DB"

interface Cred {
    prop: string
    value: boolean | SingleMeal[]
}


export const CredentialMeals = (dispatch: any, cred: Cred) => {
    dispatch({
        type: 'Credential_In_Meals',
        payload: { prop: cred.prop, value: cred.value },
    });
}


export const FetchAllUserMeals = async (dispatch: any, uid: string) => {
    CredentialMeals(dispatch, { prop: "loading", value: true })

    let val = await UserMeals(uid)

    if (val) {
        CredentialMeals(dispatch, { prop: "allMeals", value: val })
    } else {
        Alert.alert("Error fetching your meals")
    }

    CredentialMeals(dispatch, { prop: "loading", value: false })
}

export const FetchAllMeals = async (dispatch: any) => {
    CredentialMeals(dispatch, { prop: "loading", value: true })

    let value = await AllMeals()

    if (value && value.length) {
        CredentialMeals(dispatch, { prop: "allUsers", value })
    } else Alert.alert("Error fetching users")

    CredentialMeals(dispatch, { prop: "loading", value: false })
}

export const DeleteMeal = async (dispatch: any, token: string, docId: string) => {
    let val = await DeleteSingleMeal(token, docId)

    if (val) {
        FetchAllUserMeals(dispatch, token)
        Alert.alert("Deleted successfully")
    } else {
        Alert.alert("Error deleting this entry")
    }
}

export const UpdateMeal = async (dispatch: any, token: string, docId: string, title: string, calories: number, date: Date) => {
    let val = await UpdateSingleMeal(token, docId, title, calories, date)

    if (val) {
        FetchAllUserMeals(dispatch, token)
        Alert.alert("Updated successfully")
    } else {
        Alert.alert("Error Updating this entry")
    }
}