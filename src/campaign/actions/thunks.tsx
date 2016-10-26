import { FETCH_CAMPAIGN_SUCCESS } from "./actionTypes";
import {requestFetchCampaign, fetchCampaignInvalid} from "./actions";
import { API_URL } from "../../constants";
import { store } from "../../main";

const fetchCampaign = (campaignId: string, successCb = null, failCb = null) => {
    return (dispatch) => {
        dispatch(requestFetchCampaign());

        let formData = new FormData();
        formData.append("campaignId", campaignId);

        fetch(`${API_URL}/campaign`, {
            body: formData,
            headers: {
                Authorization: `Bearer ${store.getState().auth.data.token}`,
            },
            method: "GET",
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            }

            throw "Error fetching campaign.";
        })
        .then(json => {
            const { gameType, title } = json;

            if (campaignId) {
                dispatch({ data: { campaignId, gameType, title }, type: FETCH_CAMPAIGN_SUCCESS });

                if (typeof successCb === "function") {
                    successCb();
                }
            } else {
                throw "Error fetching campaign data.";
            }
        })
        .catch((err) => {
            console.error(err);

            if (typeof err !== "string") {
                err = "Error connecting to server.";
            }

            dispatch(fetchCampaignInvalid(err));

            if (typeof failCb === "function") {
                failCb(err);
            }
        });
    };
};

export { fetchCampaign };
