import { handleActions } from "redux-actions";
import { FETCH_CAMPAIGN_SUCCESS, FETCH_CAMPAIGNS_SUCCESS } from "./fetch/actionTypes";
import { CREATE_CAMPAIGN_SUCCESS } from "./creator/actionTypes";
import { merge } from "lodash";
import { normalize }  from "normalizr";
import { campaign, arrayOfCampaigns } from "./models";

export default handleActions({
    /* FETCH */
    [FETCH_CAMPAIGN_SUCCESS]: (state, action: any) => {
        const { campaignId, name, gameType, gmUserId } = action.payload;
        const norm = normalize({ campaignId, name, gameType, gmUserId }, campaign);

        return merge({}, state, norm.entities.campaign);
    },
    [FETCH_CAMPAIGNS_SUCCESS]: (state, action: any) => {
        const campaigns = action.payload;
        const norm = normalize(campaigns, arrayOfCampaigns);

        return merge({}, state, norm.entities.campaign);
    },

    /* CREATE */
    [CREATE_CAMPAIGN_SUCCESS]: (state, action: any) => {
        const norm = normalize(action.data, campaign);

        return merge({}, state, norm.entities.campaign);
    },
}, {});
