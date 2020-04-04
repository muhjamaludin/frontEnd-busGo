const initialState = {
  data: [],
  isLoading: false,
}

export default function Agents(state = initialState, actions) {
  switch (actions.type) {
    case 'GET_ROUTES':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'GET_ROUTE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'EDIT_ROUTE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'ADD_ROUTE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'DELETE_ROUTE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    default:
      return { ...state }
  }
}
