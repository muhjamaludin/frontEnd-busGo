const initialState = {
  data: [],
  isLoading: false
}

export default function Agents(state = initialState, actions) {
  switch (actions.type) {
    case 'GET_AGENTS':
      return {
        ...state,
        isLoading: false,
        data: actions.payload
      }
    case 'GET_AGENT':
      return {
        ...state,
        isLoading: false,
        data: actions.payload
      }
    case 'EDIT_AGENT':
      return {
        ...state,
        isLoading: false,
        data: actions.payload
      }
    case 'ADD_AGENT':
      return {
        ...state,
        isLoading: false,
        data: actions.payload
      }
    case 'DELETE_AGENT':
      return {
        ...state,
        isLoading: false,
        data: actions.payload
      }
    default:
      return { ...state }
  }
}
