import { CREATE_CAMPAIGN, CREATE_CAMPAIGN_SUCCESS } from "./actionTypes";
import { ICampaignData } from "../containers/CampaignCreator";

const createCampaign = (campaignData: ICampaignData) => {
    return (dispatch) => {
        const { gameType, title } = campaignData;
        dispatch({type: CREATE_CAMPAIGN});
        return setTimeout(() => {
            dispatch({type: CREATE_CAMPAIGN_SUCCESS, gameType, title});
        }, 1000);
    };
};

export { createCampaign };
