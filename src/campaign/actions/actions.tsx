import { createAction } from "redux-actions";
import { FETCH_CAMPAIGN_REQUEST, FETCH_CAMPAIGN_SUCCESS, FETCH_CAMPAIGN_INVALID } from "./actionTypes";

const requestFetchCampaign = createAction(
    FETCH_CAMPAIGN_REQUEST,
);

const fetchCampaignInvalid = createAction(
    FETCH_CAMPAIGN_INVALID,
    (message: string) => message,
);

const fetchCampaignSuccess = createAction(
    FETCH_CAMPAIGN_SUCCESS,
);

export {
    requestFetchCampaign,
    fetchCampaignInvalid,
    fetchCampaignSuccess,
};
