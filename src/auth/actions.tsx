import { createAction } from "redux-actions";
import { LOGIN } from "./actionTypes";

const login = createAction(
    LOGIN,
    (username: string, password: string) => ({ username, password })
)

const logout = createAction(
    LOGIN,
    () => ({})
)

export { login, logout };