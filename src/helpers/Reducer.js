import { LOGIN, LOGOUT } from './Actions';

const Reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null
            }
        case "LOGIN_ERROR":
            return {
                ...state,
                isError: action.isError
            }
        default:
            break;
    }
}

export default Reducer;