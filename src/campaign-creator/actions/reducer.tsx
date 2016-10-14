import { handleActions } from "redux-actions";
import { CREATE_CAMPAIGN, CREATE_CAMPAIGN_INVALID, CREATE_CAMPAIGN_SUCCESS } from "./actionTypes";

interface ICampaignState {
    error?: string;
    gameType?: string;
    isRunning?: boolean;
    title?: string;
}

const initialCampaignState: ICampaignState = {
    error: null,
    gameType: null,
    isRunning: false,
    title: null,
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
