import * as Actions from './Actions';

const Reducer = (state, action) => {
    switch (action.type) {
        case Actions.RESET_ERROR:
            return {
                ...state,
                isError: false,
                message: null
            }
        case Actions.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                isError: false,
                message: null
            }
        case Actions.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                isError: false,
                message:null
            }
        case Actions.LOGIN_ERROR:
        case Actions.SIGNUP_ERROR:
            return {
                ...state,
                isError: action.isError,
                message: action.message
            }
        case Actions.DELETE_CONNECTION:
            return state;
        case Actions.SET_DATABASE:
            return({
                ...state,
                database: action.database,
                databaseUsername: action.username,
                tables: action.tables,
                host: action.host

            });
        default:
            break;
    }
}

export default Reducer;