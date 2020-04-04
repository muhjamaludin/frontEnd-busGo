const initialState = {
  data: [],
  isLoading: false,
}

export default function Agents(state = initialState, actions) {
  switch (actions.type) {
    case 'GET_SCHEDULES':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'GET_SCHEDULE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'EDIT_SCHEDULE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'ADD_SCHEDULE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    case 'DELETE_SCHEDULE':
      return {
        ...state,
        isLoading: false,
        data: actions.payload,
      }
    default:
      return { ...state }
  }
}
