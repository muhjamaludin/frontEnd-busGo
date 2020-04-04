const initialState = {
  busGo: []
};

export default function busGo(state = initialState, action) {
  switch (action.type) {
    case 'CHECK_DATA': {
      const { data } = state;
      return {
        ...state,
        data
      };
    }
    case 'LOGIN_USER':
      return { ...state, busGo: action.payload };
    default: {
      return {
        ...state
      };
    }
  }
}
