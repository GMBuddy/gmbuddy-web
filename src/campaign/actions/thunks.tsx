import { FETCH_CAMPAIGN_SUCCESS } from "./actionTypes";
import {requestFetchCampaign, fetchCampaignInvalid} from "./actions";
import { API_URL } from "../../constants";
import { store } from "../../main";

const fetchCampaign = (gameType: string, campaignId: string, successCb = null, failCb = null) => {
    return (dispatch) => {
        dispatch(requestFetchCampaign());
        setTimeout(() => {
            fetch(`${API_URL}/${gameType}/campaigns/${campaignId}`, {
                headers: {
                    Authorization: `Bearer ${store.getState().auth.data.token}`,
                },
                method: "GET",
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }

                    throw "Error fetching campaign.";
                })
                .then(json => {
                    const {campaignId, name, gmUserId} = json;

                    if (campaignId) {
                        const data = {campaignId, gameType, title: name, gmUserId};
                        dispatch({data, type: FETCH_CAMPAIGN_SUCCESS});

                        if (typeof successCb === "function") {
                            successCb(data);
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
        }, 5000);
    };
};

export { fetchCampaign };
