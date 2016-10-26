import { handleActions } from "redux-actions";
import { CREATE_CAMPAIGN_SUCCESS } from "./actionTypes";
import { merge } from "lodash";

interface ICampaign {
    campaignId: string;
    gameType: string;
    title: string;
}

export default handleActions({
    [CREATE_CAMPAIGN_SUCCESS]: (state: ICampaign[], action: any) => {
        const { campaignId, title, gameType } = action.data;
        let newState = merge({}, state);

        newState[campaignId] = {campaignId, title, gameType};

        return newState;
    },
}, {});
