interface Action {
  type: string
  payload: any
}

interface Payload {
  prop: string
  value: number | string | object
}

interface Props {
  email: string
  password: string
  name: string
  userType: string
  token: null | string
}

const INITIAL_STATE: Props = {
  email: '',
  password: '',
  name: '',
  userType: 'User',
  token: null,
}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'Credential_In':
      return { ...state, [action.payload.prop]: action.payload.value }
    case 'RESET':
      return { ...state, ...INITIAL_STATE }
    default:
      return state
  }
}
