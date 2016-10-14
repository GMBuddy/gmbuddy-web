import { CREATE_CAMPAIGN, CREATE_CAMPAIGN_SUCCESS, CREATE_CAMPAIGN_INVALID } from "./actionTypes";
import { ICampaignData } from "../containers/CampaignCreator";

const createCampaign = (campaignData: ICampaignData) => {
    return (dispatch) => {
        const { gameType, name } = campaignData;
        dispatch({type: CREATE_CAMPAIGN});
        return setTimeout(() => {
            dispatch({type: CREATE_CAMPAIGN_SUCCESS, gameType, name});
        }, 1000);
    };
};

export { createCampaign };
