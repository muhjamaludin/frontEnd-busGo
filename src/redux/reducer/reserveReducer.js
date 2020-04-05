const initialState = {
    reservations: [],
    pageInfo: {},
    isLoading: false,
}

export default function Reserve(state = initialState, actions) {
    switch (actions.type) {
        case 'GET_RESERVATIONS':
            return {
                ...state,
                isLoading: false,
                reservations: actions.payload,
                pageInfo: actions.pageInfo
            }
        case 'GET_RESERVATION':
            return {
                ...state,
                isLoading: false,
                reservations: actions.payload,
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
