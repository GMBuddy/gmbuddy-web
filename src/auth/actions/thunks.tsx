import { push } from "react-router-redux";
import {requestAuth, authSuccess, authLogout, authInvalid} from "./actions";
import "isomorphic-fetch";
import { AUTH_API_URL } from "../../constants";

const login = (username, password, successCb = null, failCb = null) => {
    return (dispatch) => {
        let formData = new FormData();
        formData.append("email", username);
        formData.append("password", password);

        dispatch(requestAuth());

        fetch(`${AUTH_API_URL}/account/login`, {
            body: formData,
            method: "POST",
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }

            throw "Invalid username or password.";
        })
        .then(data => {
            const { accessToken } = data;

            if (accessToken) {
                dispatch(authSuccess(accessToken));

                localStorage.setItem("auth", JSON.stringify(accessToken));

                if (typeof successCb === "function") {
                    successCb();
                }
            } else {
                throw "Error loading user token.";
            }
        })
        .catch((err) => {
            console.error(err);

            if (typeof err !== "string") {
                err = "Error connecting to server.";
            }

            dispatch(authInvalid(err));

            if (typeof failCb === "function") {
                failCb(err);
            }
        });
    };
};

const register = (data, successCb = null, failCb = null) => {
    const { firstname, lastname, username, password } = data;

    return (dispatch) => {
        dispatch(requestAuth());

        let formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", username);
        formData.append("password", password);

        fetch(`${AUTH_API_URL}/account/register`, {
            body: formData,
            method: "POST",
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }

                throw "Error creating user.";
            })
            .then(json => {
                const { accessToken } = json;

                if (accessToken) {
                    dispatch(authSuccess(accessToken));

                    localStorage.setItem("auth", JSON.stringify(accessToken));

                    if (typeof successCb === "function") {
                        successCb();
                    }
                } else {
                    throw "Error loading user token.";
                }
            })
            .catch((err) => {
                console.error(err);

                if (typeof err !== "string") {
                    err = "Error connecting to server.";
                }

                dispatch(authInvalid(err));

                if (typeof failCb === "function") {
                    failCb(err);
                }
            });
    };
};

const logout = () => {
    return (dispatch) => {
        dispatch(push("/"));
        dispatch(authLogout());
        localStorage.removeItem("auth");
    };
};

export { login, register, logout };
