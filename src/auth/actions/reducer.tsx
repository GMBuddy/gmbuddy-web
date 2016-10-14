import { handleActions } from "redux-actions";
import { LOGIN, LOGIN_INVALID, LOGIN_SUCCESS, LOGOUT } from "./actionTypes";

interface IAuthData {
    username: string;
    token: string;
}

interface IAuthState {
    isRunning: boolean;
    error: string;
    data: IAuthData;
}

const initialState: IAuthState = {
    data: {
        token: null,
        username: null,
    },
    error: null,
    isRunning: false,
};

const setState = (state: IAuthState, newState: IAuthState) => {
    return Object.assign({}, state, newState);
};

export default handleActions({
    [LOGIN]: (state: IAuthState) => {
        return setState(state, {error: null, isRunning: true} as IAuthState);
    },

    [LOGIN_INVALID]: (state: IAuthState, action: any) => {
        return setState(state, { error: action.message, isRunning: false } as IAuthState);
    },

    [LOGIN_SUCCESS]: (state: IAuthState, action: any) => {
        return setState(
            state,
            {
                data: {
                    token: action.token,
                    username: action.username,
                },
                error: null,
                isRunning: false,
            },
        );
    },

    [LOGOUT]: () => {
        return initialState;
    },
}, initialState);
