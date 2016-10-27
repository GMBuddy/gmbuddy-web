import CampaignView from "./containers/CampaignView";
import { simpleAuth } from "../auth/authMethods";

export default {
    component: CampaignView,
    path: "/:gameType/campaign/:campaignId",
    onEnter: simpleAuth,
};
