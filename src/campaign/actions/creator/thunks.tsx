import { CREATE_CAMPAIGN_SUCCESS } from "./actionTypes";
import {requestCreateCampaign, createCampaignInvalid} from "./actions";
import { API_URL } from "../../../constants";
import { store } from "../../../main";
import { ICampaignData } from "gmbuddy/campaign";

const createCampaign = (campaignData: ICampaignData, successCb = null, failCb = null) => {
    return (dispatch) => {
        const { gameType, name } = campaignData;

        dispatch(requestCreateCampaign());

        let formData = new FormData();
        formData.append("name", name);

        fetch(`${API_URL}/${gameType}/campaigns`, {
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

                throw "Error creating campaign.";
            })
            .then(json => {
                const { campaignId } = json;

                if (campaignId) {
                    dispatch({ data: { campaignId, gameType, name }, type: CREATE_CAMPAIGN_SUCCESS });

                    if (typeof successCb === "function") {
                        successCb(campaignId);
                    }
                } else {
                    throw "Error loading campaign data.";
                }
            })
            .catch((err) => {
                console.error(err);

                if (typeof err !== "string") {
                    err = "Error connecting to server.";
                }

                dispatch(createCampaignInvalid(err));

                if (typeof failCb === "function") {
                    failCb(err);
                }
            });
    };
};

export { createCampaign };
