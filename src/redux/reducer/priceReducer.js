const initialState = {
  prices: [],
  pageInfo: {},
  isLoading: false
}

export default function Prices(state = initialState, actions) {
  switch (actions.type) {
    case 'GET_PRICES':
      return {
        ...state,
        isLoading: false,
        prices: actions.payload.data,
        pageInfo: actions.payload.pageInfo
      }
    case 'GET_PRICE_BY_ID':
      return {
        ...state,
        isLoading: false,
        prices: actions.payload,
      }
    case 'EDIT_PRICE':
      return {
        ...state,
        isLoading: false,
        prices: actions.payload,
      }
    case 'ADD_PRICE':
      return {
        ...state,
        isLoading: false,
        prices: actions.payload,
      }
    case 'DELETE_PRICE':
      return {
        ...state,
        isLoading: false,
        prices: actions.payload,
      }
    default:
      return { ...state }
  }
}
