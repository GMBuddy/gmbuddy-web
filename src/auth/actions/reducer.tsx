import { handleActions } from "redux-actions";
import { LOGIN, LOGIN_INVALID, LOGIN_SUCCESS, LOGOUT } from "./actionTypes";
import { merge } from "lodash";

interface IAuthData {
    username: string;
    token: string;
}

interface IAuthState {
    isFetching: boolean;
    error: string;
    data: IAuthData;
}

const initialState: IAuthState = {
    data: {
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
        const { token, username } = action.payload;

        return setState(
            state,
            {
                data: {
                    token,
                    username,
                },
                error: null,
                isFetching: false,
            },
        );
    },

    [LOGOUT]: () => {
        return initialState;
    },
}, initialState);
