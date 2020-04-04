const initialState = {
  data: [],
  isLoading: false,
}

export default function Agents(state = initialState, actions) {
  switch (actions.type) {
    case 'GET_BUSES':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'GET_BUS':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'EDIT_BUS':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'ADD_BUS':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'DELETE_BUS':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    default:
      return { ...state }
  }
}
