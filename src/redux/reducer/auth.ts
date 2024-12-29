// example use reducer for login
const defaultState = {
  token: '',
  user: [],
};

export default function authReducer(state = defaultState, action: any) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}
