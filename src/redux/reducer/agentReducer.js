const initialState = {
  agents: [],
  isLoading: true,
}

export default function Agents(state = initialState, actions) {
  console.log(actions)
  switch (actions.type) {
    case 'GET_AGENTS':
      return {
        ...state,
        isLoading: false,
        agents: actions.payload.data,
        pageInfo: actions.payload.pageInfo
      }
    case 'SEARCH_DATA':
      return {
        ...state,
        agents: actions.payload
      }
    case 'MOVE_PAGE':
      return {
        ...state,
        agents: actions.payload.data,
        pageInfo: actions.payload.pageInfo
      }
    case 'GET_AGENT_BY_ID':
      return {
        ...state,
        isLoading: false,
        agents: actions.payload,
      }
    case 'EDIT_AGENT':
      return {
        ...state,
        isLoading: false,
        agents: actions.payload,
      }
    case 'ADD_AGENT':
      return {
        ...state,
        isLoading: false,
        agents: actions.payload
      }
    case 'DELETE_AGENT':
      return {
        ...state,
        isLoading: false,
        agents: actions.payload,
      }
    default:
      return { ...state }
  }
}
