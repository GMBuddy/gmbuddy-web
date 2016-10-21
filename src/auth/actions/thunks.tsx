import { push } from "react-router-redux";
import {requestAuth, authSuccess, authLogout } from "./actions";
import "isomorphic-fetch";
import { API_URL } from "../../constants";

function storeAuthInLocalStorage(username, token) {
    localStorage.setItem("authData", JSON.stringify({username, token}));
}

const login = (username, password, successCb = () => {}) => {
    return (dispatch) => {
        dispatch(requestAuth());

        let formData = new FormData();
        formData.append("email", username);
        formData.append("password", password);

        fetch(`${API_URL}/account/login`, {
            method: "POST",
            mode: "cors",
            headers: new Headers({
                "content-type": "application/x-www-form-urlencoded; charset=utf-8",
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            }),
            body: formData
        }).then(response => {
            console.log("SUCCESS LOG", response);
        }).catch(error => {
            console.error("ERR LOG", error);
        });

        // Fake API request
        return setTimeout(() => {
            const token = "c842ca73-8fea-4dbb-bf87-4f843b6aa311";
            dispatch(authSuccess({ username, token }));
            storeAuthInLocalStorage(username, token);
            successCb();
        }, 500);
    };
};

const register = (data, successCb = () => {}) => {
    const { firstname, lastname, username, password } = data;

    return (dispatch) => {
        dispatch(requestAuth());

        let formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", username);
        formData.append("password", password);

        fetch(`${API_URL}/account/register`, {
            method: "POST",
            mode: "cors",
            headers: new Headers({
                "content-type": "application/x-www-form-urlencoded; charset=utf-8",
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            }),
            body: formData
        }).then(response => {
            console.log("SUCCESS REG", response);
        }).catch(error => {
            console.error("ERR REG", error);
        });

        // Fake API request
        return setTimeout(() => {
            const token = "c842ca73-8fea-4dbb-bf87-4f843b6aa311";

            // Login using new user
            dispatch(authSuccess({ username, token }));
            storeAuthInLocalStorage(username, token);
            successCb();
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

export { login, register, logout };
