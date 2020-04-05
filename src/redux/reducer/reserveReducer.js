const initialState = {
    data: [],
    isLoading: false,
}

export default function Reserve(state = initialState, actions) {
    switch (actions.type) {
        case 'GET_RESERVATIONS':
            return {
                ...state,
                isLoading: false,
                data: actions.payload,
            }
        case 'GET_RESERVATION':
            return {
                ...state,
                isLoading: false,
                data: actions.payload,
            }
        case 'EDIT_RESERVATION':
            return {
                ...state,
                isLoading: false,
                data: actions.payload,
            }
        case 'ADD_RESERVATION':
            return {
                ...state,
                isLoading: false,
                data: actions.payload,
            }
        case 'DELETE_RESERVATION':
            return {
                ...state,
                isLoading: false,
                data: actions.payload,
            }
        default:
            return { ...state }
    }
}
