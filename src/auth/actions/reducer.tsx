import { handleActions } from "redux-actions";
import { LOGIN, LOGIN_INVALID, LOGIN_SUCCESS, LOGOUT } from "./actionTypes";
import { merge } from "lodash";
import * as jwtDecode from "jwt-decode";

interface IAuthData {
    username: string;
    token: string;
    id: string;
    firstname: string;
    lastname: string;
}

interface IAuthState {
    isFetching: boolean;
    error: string;
    data: IAuthData;
}

const initialState: IAuthState = {
    data: {
        firstname: null,
        id: null,
        lastname: null,
        token: null,
        username: null,
    },
    error: null,
    isFetching: false,
};

const setState = (state: IAuthState, newState: IAuthState) => {
    return merge({}, state, newState);
};

export default handleActions({
    [LOGIN]: (state: IAuthState) => {
        return setState(state, {error: null, isFetching: true} as IAuthState);
    },

    [LOGIN_INVALID]: (state: IAuthState, action: any) => {
        return setState(state, { error: action.payload, isFetching: false } as IAuthState);
    },

    [LOGIN_SUCCESS]: (state: IAuthState, action: any) => {
        let decoded;

        try {
            decoded = jwtDecode["default"](action.payload);

            return setState(
                state,
                {
                    data: {
                        firstname: decoded.given_name || "undefined",
                        id: decoded.sub || "undefined",
                        lastname: decoded.family_name || "undefined",
                        token: action.payload,
                        username: decoded.email || "undefined",
                    },
                    error: null,
                    isFetching: false,
                },
            );
        } catch (err) {
            console.error("Error with JWT:", err);
            return setState(state, { error: err, isFetching: false } as IAuthState);
        }
    },

    [LOGOUT]: () => {
        return initialState;
    },
}, initialState);
