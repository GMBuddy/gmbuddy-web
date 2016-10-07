import { handleActions, Action } from "redux-actions";
import { LOGIN, LOGIN_INVALID, LOGIN_SUCCESS, LOGOUT } from "./actionTypes";

const initialState = {
    isRunning: false,
    error: null,
    data: { username: null, token: null },
};

export default handleActions({
    [LOGIN]: (state) => {
        console.log("Login started");
        return Object.assign({}, state, { error: false, isRunning: true });
    },
    [LOGIN_INVALID]: (state, action: Action) => {
        return Object.assign({}, state, { error: action.payload.message, isRunning: false });
    },
    [LOGIN_SUCCESS]: (state, action: Action) => {
        console.log("Successful login", action);
        return Object.assign({}, state, { isRunning: true, data: { username: action.payload.username, token: action.payload.token } });
    },
    [LOGOUT]: () => {
        return [{data: null}];
    }
}, initialState);