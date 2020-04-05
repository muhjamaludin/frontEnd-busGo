const initialState = {
  busses: [],
  pageInfo: {},
  isLoading: true,
}

export default function Agents(state = initialState, actions) {
  console.log(actions)
  switch (actions.type) {
    case 'GET_BUSES':
      return {
        ...state,
        isLoading: false,
        busses: actions.payload.data,
        pageInfo: actions.payload.pageInfo
      }
    case 'GET_BUS_BY_ID':
      return {
        ...state,
        isLoading: false,
        busses: actions.payload,
      }
    case 'EDIT_BUS':
      return {
        ...state,
        isLoading: false,
        busses: actions.payload,
      }
    case 'ADD_BUS':
      return {
        ...state,
        isLoading: false,
        busses: actions.payload,
      }
    case 'DELETE_BUS':
      return {
        ...state,
        isLoading: false,
        busses: actions.payload,
      }
    default:
      return { ...state }
  }
}
