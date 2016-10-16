import { push } from "react-router-redux";
import { requestAuth, authSuccess, authLogout } from "./actions";

const login = (username, password) => {
    return (dispatch) => {
        dispatch(requestAuth());

        // Fake API request
        return setTimeout(() => {
            const token = "c842ca73-8fea-4dbb-bf87-4f843b6aa311";
            dispatch(authSuccess({ username, token }));
            localStorage.setItem("authData", JSON.stringify({username, token}));
        }, 500);
    };
};

const logout = () => {
    return (dispatch) => {
        dispatch(push("/"));
        dispatch(authLogout());
        localStorage.removeItem("authData");
    };
};

export { login, logout };
