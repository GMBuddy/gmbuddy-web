import {LOGIN, LOGIN_SUCCESS, LOGOUT} from "./actionTypes";

const login = (username, password) => {
    return (dispatch) => {
        dispatch({type: LOGIN});
        return setTimeout(() => {
            const token = "c842ca73-8fea-4dbb-bf87-4f843b6aa311";
            dispatch({type: LOGIN_SUCCESS, username, token});
        }, 1000);
    };
};

const logout = () => {
    return (dispatch) => {
        dispatch({type: LOGOUT});
    };
};

export { login, logout };
