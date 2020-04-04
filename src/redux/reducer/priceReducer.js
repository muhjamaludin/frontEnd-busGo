const initialState = {
  data: [],
  isLoading: false,
}

export default function Agents(state = initialState, actions) {
  switch (actions.type) {
    case 'GET_PRICESS':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'GET_PRICE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'EDIT_PRICE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'ADD_PRICE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'DELETE_PRICE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    default:
      return { ...state }
  }
}
