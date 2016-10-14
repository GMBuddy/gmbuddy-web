import CampaignCreator from "./containers/CampaignCreator";
import { simpleAuth } from "../auth/authMethods";

export default {
    component: CampaignCreator,
    onEnter: simpleAuth,
    path: "/campaign/create",
};
