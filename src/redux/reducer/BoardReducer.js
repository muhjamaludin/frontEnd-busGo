const initialState = {
  boards: [],
  pageInfo: {},
  isLoading: false,
}

export default function Reserve(state = initialState, actions) {
  switch (actions.type) {
      case 'GET_BOARD':
          return {
              ...state,
              isLoading: false,
              boards: actions.payload
          }
      case 'EDIT_RESERVATION':
          return {
              ...state,
              isLoading: false,
              reservations: actions.payload,
          }
      case 'ADD_RESERVATION':
          return {
              ...state,
              isLoading: false,
              reservations: actions.payload,
          }
      case 'DELETE_RESERVATION':
          return {
              ...state,
              isLoading: false,
              reservations: actions.payload,
          }
      default:
          return { ...state }
  }
}
