const initialState = {
  users: [],
  pageInfo: {},
  isLoading: true
}

export default function Users(state = initialState, actions) {
  switch (actions.type) {
    case 'GET_USERS':
      return {
        ...state,
        isLoading: false,
        users: actions.payload.data,
        pageInfo: actions.payload.pageInfo
      }
    case 'GET_USER_BY_ID':
      return {
        ...state,
        isLoading: false,
        users: actions.payload,
      }
    case 'EDIT_USER':
      return {
        ...state,
        isLoading: false,
        users: actions.payload,
      }
    case 'EDIT_ROLE':
      return {
        ...state,
        isLoading: false,
        users: actions.payload
      }
    case 'UPLOAD_PHOTO':
      return {
        ...state,
        isLoading: false,
        users: actions.payload
      }
    case 'ADD_USER':
      return {
        ...state,
        isLoading: false,
        users: actions.payload,
      }
    case 'DELETE_USER':
      return {
        ...state,
        isLoading: false,
        users: actions.payload,
      }
    default:
      return { ...state }
  }
}