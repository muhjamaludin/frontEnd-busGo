const initialState = {
  auth: [],
  isLoading: true,
  isLogin: false,
}

export default function Auth(state = initialState, actions) {
  switch(actions.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        isLoading: false,
        isLogin: true,  
        auth: actions.payload
      }
    case 'LOADING_FALSE':
      return {
        isLoading: false,
      }
    case 'SET_LOGOUT':
      return {
        ...state,
        isLogin: false
      }
    default:
      return state
  }
}