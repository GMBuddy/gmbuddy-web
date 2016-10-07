import { createAction } from "redux-actions";
import {LOGIN, LOGIN_SUCCESS, LOGIN_INVALID} from "./actionTypes";

const login = createAction(
    LOGIN, () => ({})
);

const loginSuccess = createAction(
    LOGIN_SUCCESS, (username: string, token: string) => ({ token })
);

const loginInvalid = createAction(
    LOGIN_INVALID, (message: string) => ({ message })
);

const logout = createAction(
    LOGIN, () => ({})
);

export { login, loginSuccess, loginInvalid, logout };