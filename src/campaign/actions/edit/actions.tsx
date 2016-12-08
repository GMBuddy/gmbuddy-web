import { createAction } from "redux-actions";
import { EDIT_CAMPAIGN_REQUEST, EDIT_CAMPAIGN_SUCCESS, EDIT_CAMPAIGN_INVALID } from "./actionTypes";

const requestEditCampaign = createAction(
    EDIT_CAMPAIGN_REQUEST,
);

const editCampaignInvalid = createAction(
    EDIT_CAMPAIGN_INVALID,
    (message: string) => message,
);

const editCampaignSuccess = createAction(
    EDIT_CAMPAIGN_SUCCESS,
);

export {
    requestEditCampaign,
    editCampaignInvalid,
    editCampaignSuccess,
};
