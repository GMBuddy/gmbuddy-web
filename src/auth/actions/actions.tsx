import { createAction } from "redux-actions";
import { LOGIN, LOGIN_INVALID, LOGIN_SUCCESS, LOGOUT } from "./actionTypes";

const requestAuth = createAction(
    LOGIN,
    () => {},
);

const authInvalid = createAction(
    LOGIN_INVALID,
    (message: string) => message,
);

const authSuccess = createAction(
    LOGIN_SUCCESS,
    (authData: string[]) => authData,
);

const authLogout = createAction(
    LOGOUT,
    () => {},
)

export {
    requestAuth,
    authInvalid,
    authSuccess,
    authLogout,
};
