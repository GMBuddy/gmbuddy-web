import { handleActions } from "redux-actions";
import { CREATE_CAMPAIGN, CREATE_CAMPAIGN_INVALID, CREATE_CAMPAIGN_SUCCESS } from "./actionTypes";

interface ICampaignState {
    gameType?: string;
    name?: string;
    isRunning?: boolean;
    error?: string;
}

const initialCampaignState: ICampaignState = {
    gameType: null,
    name: null,
    isRunning: false,
    error: null,
};

const setCampaignState = (state: ICampaignState, newState: ICampaignState) => {
    return Object.assign({}, state, newState);
};

export default handleActions({
    [CREATE_CAMPAIGN]: (state: ICampaignState) => {
        return setCampaignState(state, { error: null, isRunning: true } as ICampaignState);
    },

    [CREATE_CAMPAIGN_INVALID]: (state: ICampaignState) => {
        return setCampaignState(state, {error: "Error creating campaign.", isRunning: false} as ICampaignState);
    },

    [CREATE_CAMPAIGN_SUCCESS]: (state: ICampaignState) => {
        return setCampaignState(state, {error: null, isRunning: false} as ICampaignState);
    },
}, initialCampaignState);
