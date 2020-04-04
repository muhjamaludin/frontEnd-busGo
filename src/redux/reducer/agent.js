const intialState = {
    agents: []
}

const product = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_AGENTS_PENDING':
        return {
          ...state,
          isLoading: true
        }
      case 'GET_AGENTS_REJECTED' :
        return {
          ...state,
          isLoading: true
        }
      case 'GET_AGENTS_FULFILLED':
        return {
          ...state,
          isLoading: false,
          agents: action.payload.data.result,
          pagination: action.payload.data.totalpages
        }
      case 'GET_DETAIL_PENDING':
        return {
          ...state
        }
      case 'GET_DETAIL_REJECTED' :
        return {
          ...state
        }
      case 'GET_DETAIL_FULFILLED':
        return {
          ...state,
          agents: action.payload.data.result
        }
    }
}