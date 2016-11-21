import { CREATE_CHARACTER_SUCCESS } from "./actionTypes";
import {requestCreateCharacter, createCharacterInvalid} from "./actions";
import { API_URL } from "../../../constants";
import { store } from "../../../main";
import { ICharacterData } from "gmbuddy/micro20/character";
import { merge } from "lodash";

const createCharacter = (characterData: ICharacterData, successCb = null, failCb = null) => {
    return (dispatch) => {
        const { gameType, details, baseStats } = characterData;

        dispatch(requestCreateCharacter());

        let formData = new FormData();

        switch (gameType) {
            case "micro20":
                formData.append("name", details.name);
                formData.append("class", details.class);
                formData.append("race", details.race);
                formData.append("height", details.height);
                formData.append("weight", details.weight);
                formData.append("hairColor", details.hairColor);
                formData.append("eyeColor", details.eyeColor);
                formData.append("dexterity", baseStats.dexterity);
                formData.append("strength", baseStats.strength);
                formData.append("mind", baseStats.mind);
                break;
            default:
                const message = "Trying to create a campaign with an invalid GameType.";
                failCb(message);
                dispatch(createCharacterInvalid(message));
                return;
        }

        fetch(`${API_URL}/${gameType}/characters`, {
            body: formData,
            headers: {
                Authorization: `Bearer ${store.getState().auth.data.token}`,
            },
            method: "POST",
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                }

                throw "Error creating character.";
            })
            .then(json => {
                const { characterId } = json;

                if (characterId) {
                    const detailsWithId = merge(details, {characterId});
                    dispatch({ data: { gameType, details: detailsWithId, baseStats }, type: CREATE_CHARACTER_SUCCESS });
                    if (typeof successCb === "function") {
                        successCb(characterId);
                    }
                } else {
                    throw "Error loading character data.";
                }
            })
            .catch((err) => {
                if (typeof err !== "string") {
                    err = "Error connecting to server.";
                }

                dispatch(createCharacterInvalid(err));

                if (typeof failCb === "function") {
                    failCb(err);
                }
            });
    };
};

export { createCharacter };
