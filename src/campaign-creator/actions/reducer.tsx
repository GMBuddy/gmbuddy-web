import { handleActions } from "redux-actions";
import { CREATE_CAMPAIGN_SUCCESS } from "./actionTypes";

interface ICampaign {
    gameType: string;
    title: string;
}

const initialCampaign: ICampaign = {
    gameType: null,
    title: null,
};

export default handleActions({
    [CREATE_CAMPAIGN_SUCCESS]: (state: any, action: any) => {
        return [...state, Object.assign({}, initialCampaign, action.data)];
    },
}, initialCampaign);
