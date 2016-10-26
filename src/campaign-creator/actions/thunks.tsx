import { CREATE_CAMPAIGN_SUCCESS } from "./actionTypes";
import { ICampaignData } from "../containers/CampaignCreator";
import {requestCreateCampaign, createCampaignInvalid} from "./actions";
import { API_URL } from "../../constants";
import { store } from "../../main";

const createCampaign = (campaignData: ICampaignData, successCb = null, failCb = null) => {
    return (dispatch) => {
        const { gameType, title } = campaignData;

        dispatch(requestCreateCampaign());

        let formData = new FormData();
        formData.append("name", title);

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
                    dispatch({ data: { campaignId, gameType, title }, type: CREATE_CAMPAIGN_SUCCESS });

                    if (typeof successCb === "function") {
                        successCb();
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
