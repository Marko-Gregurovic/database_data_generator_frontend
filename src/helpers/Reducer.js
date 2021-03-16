import { LOGIN, LOGIN_ERROR, LOGOUT, SIGNUP_ERROR, RESET_ERROR } from './Actions';

const Reducer = (state, action) => {
    switch (action.type) {
        case RESET_ERROR:
            return {
                ...state,
                isError: false,
                message: null
            }
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                isError: false,
                message: null
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                isError: false,
                message:null
            }
        case LOGIN_ERROR:
        case SIGNUP_ERROR:
            return {
                ...state,
                isError: action.isError,
                message: action.message
            }
        case "DELETE_CONNECTION":
            return state;
        default:
            break;
    }
}

export default Reducer;