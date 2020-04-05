const initialState = {
  schedules: [],
  pageInfo: {},
  isLoading: false,
}

export default function Agents(state = initialState, actions) {
  switch (actions.type) {
    case 'GET_SCHEDULES':
      return {
        ...state,
        isLoading: false,
        schedules: actions.payload.data,
        pageInfo: actions.payload.pageInfo
      }
    case 'GET_SCHEDULE_BY_ID':
      return {
        ...state,
        isLoading: false,
        schedules: actions.payload,
      }
    case 'EDIT_SCHEDULE':
      return {
        ...state,
        isLoading: false,
        schedules: actions.payload,
      }
    case 'ADD_SCHEDULE':
      return {
        ...state,
        isLoading: false,
        schedules: actions.payload,
      }
    case 'DELETE_SCHEDULE':
      return {
        ...state,
        isLoading: false,
        schedules: actions.payload,
      }
    default:
      return { ...state }
  }
}
