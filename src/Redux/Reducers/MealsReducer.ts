interface Action {
    type: string
    payload: any
}

export interface SingleMeal {
    name: string
    date: Date
    calories: number
    docId: number
}

export interface SingleUser {
    userId: string
    name: string
    userType: string
}

interface Props {
    allMeals: SingleMeal[]
    allUsers: SingleUser[]
    loading: boolean
}

const INITIAL_STATE: Props = {
    allMeals: [],
    allUsers: [],
    loading: false
}

export default (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case 'Credential_In_Meals':
            return { ...state, [action.payload.prop]: action.payload.value }
        case 'RESET':
            return { ...state, ...INITIAL_STATE }
        default:
            return state
    }
}
