const initialState = {
  price: [],
  pageInfo: {},
  isLoading: true
}

export default function Agents(state = initialState, actions) {
  switch (actions.type) {
    case 'GET_PRICESS':
      return {
        ...state,
        isLoading: false,
        price: actions.payload.data,
        pageInfo: actions.payload.pageInfo
      }
    case 'GET_PRICE_BY_ID':
      return {
        ...state,
        isLoading: false,
        price: actions.payload,
      }
    case 'EDIT_PRICE':
      return {
        ...state,
        isLoading: false,
        price: actions.payload,
      }
    case 'ADD_PRICE':
      return {
        ...state,
        isLoading: false,
        price: actions.payload,
      }
    case 'DELETE_PRICE':
      return {
        ...state,
        isLoading: false,
        price: actions.payload,
      }
    default:
      return { ...state }
  }
}
