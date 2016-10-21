import { createAction } from "redux-actions";
import { CREATE_CAMPAIGN_REQUEST, CREATE_CAMPAIGN_SUCCESS, CREATE_CAMPAIGN_INVALID } from "./actionTypes";

const requestCreateCampaign = createAction(
    CREATE_CAMPAIGN_REQUEST,
    () => {},
);

const createCampaignInvalid = createAction(
    CREATE_CAMPAIGN_INVALID,
    (message: string) => message,
);

const createCampaignSuccess = createAction(
    CREATE_CAMPAIGN_SUCCESS,
    () => {},
);

export {
    requestCreateCampaign,
    createCampaignInvalid,
    createCampaignSuccess,
};
