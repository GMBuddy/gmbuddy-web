import { createAction } from "redux-actions";
import {
    FETCH_CAMPAIGN_REQUEST, FETCH_CAMPAIGN_SUCCESS, FETCH_CAMPAIGN_INVALID,
    FETCH_CAMPAIGNS_REQUEST, FETCH_CAMPAIGNS_INVALID, FETCH_CAMPAIGNS_SUCCESS,
} from "./actionTypes";

const requestFetchCampaign = createAction(
    FETCH_CAMPAIGN_REQUEST,
);

const fetchCampaignInvalid = createAction(
    FETCH_CAMPAIGN_INVALID,
);

const fetchCampaignSuccess = createAction(
    FETCH_CAMPAIGN_SUCCESS,
    (data: Object) => data,
);

const requestFetchCampaigns = createAction(
    FETCH_CAMPAIGNS_REQUEST,
);

const fetchCampaignsInvalid = createAction(
    FETCH_CAMPAIGNS_INVALID,
);

const fetchCampaignsSuccess = createAction(
    FETCH_CAMPAIGNS_SUCCESS,
);

export {
    requestFetchCampaign,
    fetchCampaignInvalid,
    fetchCampaignSuccess,
    requestFetchCampaigns,
    fetchCampaignsInvalid,
    fetchCampaignsSuccess,
};
