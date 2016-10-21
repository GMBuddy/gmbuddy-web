import { store } from "../main";

function isLoggedIn(state) {
    const { data, error, isRunning } = state.auth;
    return (!error && !isRunning && !!data.token);
}

export function simpleAuth (nextState, transition) {
    const state = store.getState();
    if (!isLoggedIn(state)) {
        transition("/");
    }
}

export function authLoggedOut(nextState, transition) {
    const state = store.getState();
    if (isLoggedIn(state)) {
        transition("/");
    }
}
