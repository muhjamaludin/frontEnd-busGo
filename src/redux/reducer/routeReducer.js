const initialState = {
  routes: [],
  route: [],
  pageInfo: {},
  isLoading: false,
}

export default function Routes(state = initialState, actions) {
  switch (actions.type) {
    case 'GET_ROUTES':
      return {
        ...state,
        isLoading: false,
        routes: actions.payload.data,
        pageInfo: actions.payload.pageInfo
      }
    case 'GET_ROUTE':
      return {
        ...state,
        isLoading: false,
        route: actions.payload,
      }
    case 'EDIT_ROUTE':
      return {
        ...state,
        isLoading: false,
        routes: actions.payload,
      }
    case 'ADD_ROUTE':
      return {
        ...state,
        isLoading: false,
        routes: actions.payload,
      }
    case 'DELETE_ROUTE':
      return {
        ...state,
        isLoading: false,
        routes: actions.payload,
      }
    default:
      return { ...state }
  }
}
