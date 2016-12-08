import {
    requestFetchCampaign, fetchCampaignInvalid, fetchCampaignsSuccess, fetchCampaignsInvalid,
    fetchCampaignSuccess, requestFetchCampaigns,
} from "./actions";
import { API_URL } from "../../../constants";
import { store } from "../../../main";
import { merge } from "lodash";
import { fetchCharacterSuccess } from "../../../character/actions/fetch/actions";

const fetchCampaign = (gameType: string, campaignId: string, successCb = null, failCb = null) => {
    return (dispatch) => {
        dispatch(requestFetchCampaign());

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
                if (campaignId) {
                    let data = merge({gameType}, json);

                    // only keep track of the characterIds.
                    if (data.characters && typeof data.characters === "object") {
                        let charactersById = [];

                        // Store the user data in redux, and only keep track of characterIds in the campaign.
                        data.characters.forEach((char) => {
                            dispatch(fetchCharacterSuccess(merge({gameType}, char)));
                            charactersById.push(char.details.characterId);
                        });

                        data.characters = charactersById;
                    }

                    dispatch(fetchCampaignSuccess(data));

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
    };
};

const fetchCampaigns = (gameType: string, successCb = null, failCb = null) => {
    return (dispatch) => {
        dispatch(requestFetchCampaigns());

        fetch(`${API_URL}/${gameType}/campaigns`, {
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

                    dispatch(fetchCampaignsSuccess({data}));

                    if (typeof successCb === "function") {
                        successCb(data);
                    }
                } else {
                    throw "Error fetching campaigns data.";
                }
            })
            .catch((err) => {
                console.error(err);

                if (typeof err !== "string") {
                    err = "Error connecting to server.";
                }

                dispatch(fetchCampaignsInvalid(err));

                if (typeof failCb === "function") {
                    failCb(err);
                }
            });
    };
};

export { fetchCampaign, fetchCampaigns };
