import { EDIT_CHARACTER_SUCCESS } from "./actionTypes";
import {requestEditCharacter, editCharacterInvalid} from "./actions";
import { API_URL } from "../../../constants";
import { store } from "../../../main";
import { ICharacterData } from "gmbuddy/micro20/character";
import { merge } from "lodash";
import { CLASSES, RACES } from "../../constants/micro20";
import {editCampaign} from "../../../campaign/actions/edit/thunks";
import {ICampaignData} from "gmbuddy/campaign";

const editCharacter = (characterData: ICharacterData, successCb = null, failCb = null) => {
    return (dispatch) => {
        const { gameType, details, baseStats } = characterData;

        // Changes to campaign ID:
        dispatch(editCampaign({ campaignId: details.campaignId, gameType: gameType } as ICampaignData,
            details.characterId, ""));

        dispatch(requestEditCharacter());

        let formData = new FormData();

        if (details.name) {
            formData.append("name", details.name);
        }

        if (details.class) {
            formData.append("class", CLASSES.indexOf(details.class));
        }

        if (details.race) {
            formData.append("race", RACES.indexOf(details.race));
        }

        if (details.height) {
            formData.append("height", details.height);
        }

        if (details.weight) {
            formData.append("weight", details.weight);
        }

        if (details.hairColor) {
            formData.append("hairColor", details.hairColor);
        }

        if (details.eyeColor) {
            formData.append("eyeColor", details.eyeColor);
        }

        if (baseStats.dexterity) {
            formData.append("dexterity", baseStats.dexterity);
        }

        if (baseStats.strength) {
            formData.append("strength", baseStats.strength);
        }

        if (baseStats.mind) {
            formData.append("mind", baseStats.mind);
        }

        fetch(`${API_URL}/${gameType}/characters/${details.characterId}`, {
            body: formData,
            headers: {
                Authorization: `Bearer ${store.getState().auth.data.token}`,
            },
            method: "PUT",
        })
            .then(response => {
                if (response.status !== 204) {
                    throw "Error editing character.";
                }

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
