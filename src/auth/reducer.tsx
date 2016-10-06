import { handleActions, Action } from "redux-actions";

import { LOGIN, LOGIN_INVALID, LOGIN_SUCCESS, LOGOUT } from "./actionTypes";


const initialState = {
    isRunning: false,
    error: false,
    data: null,
};

export default handleActions({
    [LOGIN]: (state) => {
        return Object.assign({}, state, { error: false, isRunning: true });
    },
    [LOGIN_INVALID]: (state) => {
        return Object.assign({}, state, { error: true, isRunning: false });
    },
    [LOGIN_SUCCESS]: (state, action: Action) => {
        return Object.assign({}, state, { isRunning: true, data: { token: "not-invalid" } });
    },
    [LOGOUT]: () => {
        return [{data: null}];
    }
}, initialState);