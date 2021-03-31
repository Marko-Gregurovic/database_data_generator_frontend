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
                message: null
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
            return ({
                ...state,
                database: action.database,
                databaseUsername: action.username,
                tables: action.tables,
                host: action.host,
                connectionId: action.connectionId
            });
        case Actions.SET_ACTIVE_TABLE:
            return state;
        case Actions.CLEAR_DATABASE:
            return({
                ...state,
                database: null,
                databaseUsername: null,
                tables: null,
                host: null
            });
        case Actions.SAVE_TABLE_STATE:
            let changedTable = state.tables.find(table => table.name === action.tableName);
            changedTable = {...action.table};
            console.log(changedTable);
            console.log(state);
            return state;
        default:
            break;
    }
}

export default Reducer;