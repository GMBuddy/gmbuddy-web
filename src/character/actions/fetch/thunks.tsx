import { requestFetchCharacter, fetchCharacterInvalid, fetchCharacterSuccess,
        requestFetchCharacters, fetchCharactersInvalid, fetchCharactersSuccess} from "./actions";
import { API_URL } from "../../../constants";
import { store } from "../../../main";
import { merge } from "lodash";

const fetchCharacter = (gameType: string, characterId: string, successCb = null, failCb = null) => {
    return (dispatch) => {
        dispatch(requestFetchCharacter());

        fetch(`${API_URL}/${gameType}/characters/${characterId}`, {
            headers: {
                Authorization: `Bearer ${store.getState().auth.data.token}`,
            },
            method: "GET",
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }

                throw "Error fetching character.";
            })
            .then(json => {
                const data = merge(json, { gameType });

                dispatch(fetchCharacterSuccess(data));

                if (typeof successCb === "function") {
                    successCb(data);
                }
            })
            .catch((err) => {
                console.error(err);

                if (typeof err !== "string") {
                    err = "Error connecting to server.";
                }

                dispatch(fetchCharacterInvalid(err));

                if (typeof failCb === "function") {
                    failCb(err);
                }
            });
    };
};

const fetchCharacters = (gameType: string, successCb = null, failCb = null) => {
    return (dispatch) => {
        dispatch(requestFetchCharacters());

        fetch(`${API_URL}/${gameType}/characters`, {
            headers: {
                Authorization: `Bearer ${store.getState().auth.data.token}`,
            },
            method: "GET",
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }

                throw "Error fetching campaigns.";
            })
            .then(data => {
                if (data) {

                    // Add the gametype to each campaign result.
                    data.forEach((item) => {
                        item.gameType = gameType;
                    });

                    dispatch(fetchCharactersSuccess({data}));

                    if (typeof successCb === "function") {
                        successCb(data);
                    }
                } else {
                    throw "Error fetching characters data.";
                }
            })
            .catch((err) => {
                if (typeof err !== "string") {
                    err = "Error connecting to server.";
                }

                dispatch(fetchCharactersInvalid(err));

                if (typeof failCb === "function") {
                    failCb(err);
                }
            });
    };
};

export { fetchCharacter, fetchCharacters };
