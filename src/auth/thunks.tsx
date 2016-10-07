import {LOGIN, LOGIN_SUCCESS, LOGOUT} from "./actionTypes";

import { login as loginStart, loginSuccess } from "./actions";

const login = (username, password) => {
    return (dispatch) => {
        loginStart();
        dispatch({type: LOGIN});
        return setTimeout(() => {
            const token = "c842ca73-8fea-4dbb-bf87-4f843b6aa311";
            loginSuccess(token);
            dispatch({type: LOGIN_SUCCESS, payload: { username, token }});
        }, 1000);
    };
};

const logout = () => {
    return (dispatch) => {
        dispatch({type: LOGOUT});
    };
};


export { login, logout };
