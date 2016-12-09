import { handleActions } from "redux-actions";
import { FETCH_CAMPAIGN_SUCCESS, FETCH_CAMPAIGNS_SUCCESS } from "./fetch/actionTypes";
import { CREATE_CAMPAIGN_SUCCESS } from "./creator/actionTypes";
import { merge } from "lodash";
import { normalize }  from "normalizr";
import { campaign, arrayOfCampaigns } from "./models";
import {EDIT_CAMPAIGN_SUCCESS} from "./edit/actionTypes";

export default handleActions({
    /* FETCH */
    [FETCH_CAMPAIGN_SUCCESS]: (state, action: any) => {
        const { campaignId, characters, name, gameType, gmUserId } = action.payload;
        const norm = normalize({ campaignId, characters, name, gameType, gmUserId }, campaign);

        let copy = merge({}, state);
        return copy[campaignId] = norm.entities.campaign;
    },
    [FETCH_CAMPAIGNS_SUCCESS]: (state, action: any) => {
        const { data } = action.payload;
        const norm = normalize(data, arrayOfCampaigns);

        return merge({}, state, norm.entities.campaign);
    },

    /* CREATE */
    [CREATE_CAMPAIGN_SUCCESS]: (state, action: any) => {
        const norm = normalize(action.data, campaign);

        return merge({}, state, norm.entities.campaign);
    },

    /* EDIT */
    [EDIT_CAMPAIGN_SUCCESS]: (state, action: any) => {
        const norm = normalize(action.data, campaign);

        return merge({}, state, norm.entities.campaign);
    },
}, {});
