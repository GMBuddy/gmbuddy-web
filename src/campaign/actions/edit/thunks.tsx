import { EDIT_CAMPAIGN_SUCCESS } from "./actionTypes";
import {requestEditCampaign, editCampaignInvalid} from "./actions";
import { API_URL } from "../../../constants";
import { store } from "../../../main";
import { ICampaignData } from "gmbuddy/campaign";
import { merge } from "lodash";

const editCampaign = (data: ICampaignData, addCharacters: string = "", removeCharacters: string = "",
                      successCb = null, failCb = null) => {
    return (dispatch) => {
        const {name, gameType, campaignId} = data;

        dispatch(requestEditCampaign());

        let formData = new FormData();

        if (name) {
            formData.append("name", name);
        }
        if (addCharacters) {
            formData.append("AddCharacters", addCharacters);
        }

        if (removeCharacters) {
            formData.append("RemoveCharacters", removeCharacters);
        }

        fetch(`${API_URL}/${gameType}/campaigns/${campaignId}`, {
            body: formData,
            headers: {
                Authorization: `Bearer ${store.getState().auth.data.token}`,
            },
            method: "PUT",
        })
            .then(response => {
                if (response.status !== 200) {
                    throw "Error editing campaign.";
                }

                dispatch({ data: merge(data, {characters: []}), type: EDIT_CAMPAIGN_SUCCESS });

                if (typeof successCb === "function") {
                    successCb();
                }
            })
            .catch((err) => {
                if (typeof err !== "string") {
                    err = "Error connecting to server.";
                }

                dispatch(editCampaignInvalid(err));

                if (typeof failCb === "function") {
                    failCb(err);
                }
            });
    };
};

export { editCampaign };
