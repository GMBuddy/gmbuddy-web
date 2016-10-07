import {LOGIN, LOGIN_SUCCESS} from "./actionTypes";

import { login as loginStart, loginSuccess } from "./actions";

const login = (username, password) => {
    return (dispatch) => {
        console.log("Thunk Action");
        loginStart();
        dispatch({type: LOGIN});
        return setTimeout(() => {
            console.log("Timedout");
            const token = "c842ca73-8fea-4dbb-bf87-4f843b6aa311";
            loginSuccess(token);
            dispatch({type: LOGIN_SUCCESS, payload: { username, token }});
            // dispatch({ type: LOGIN_SUCCESS }, token);
        }, 1000);
    };
}

export { login };