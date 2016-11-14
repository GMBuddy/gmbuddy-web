import { EDIT_CHARACTER_SUCCESS } from "./actionTypes";
import {requestEditCharacter, editCharacterInvalid} from "./actions";
import { API_URL } from "../../../constants";
import { store } from "../../../main";
import { ICharacterData } from "gmbuddy/micro20/character";
import { merge } from "lodash";

const editCharacter = (characterData: ICharacterData, successCb = null, failCb = null) => {
    return (dispatch) => {
        const { gameType, details, baseStats } = characterData;

        console.log(characterData);

        dispatch(requestEditCharacter());

        let formData = new FormData();
        formData.append("campaign", details.campaign);
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

        fetch(`${API_URL}/${gameType}/characters/${details.characterId}`, {
            body: formData,
            headers: {
                Authorization: `Bearer ${store.getState().auth.data.token}`,
            },
            method: "PUT",
        })
            .then(response => {
                if (response.status === 204) {
                    return response.json();
                }

                throw "Error editing character.";
            })
            .then(() => {
                console.log("OKAY");
                const detailsWithId = merge(details);
                dispatch({ data: { gameType, details: detailsWithId, baseStats }, type: EDIT_CHARACTER_SUCCESS });
                if (typeof successCb === "function") {
                    successCb();
                }
            })
            .catch((err) => {
                if (typeof err !== "string") {
                    err = "Error connecting to server.";
                }

                dispatch(editCharacterInvalid(err));

                if (typeof failCb === "function") {
                    failCb(err);
                }
            });
    };
};

export { editCharacter };
