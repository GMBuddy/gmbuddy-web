import { CREATE_CAMPAIGN_SUCCESS } from "./actionTypes";
import { ICampaignData } from "../containers/CampaignCreator";

const createCampaign = (campaignData: ICampaignData) => {
    return (dispatch) => {
        const { gameType, title } = campaignData;
        return setTimeout(() => {
            dispatch({ data: { gameType, title }, type: CREATE_CAMPAIGN_SUCCESS });
        }, 10000);
    };
};

export { createCampaign };
