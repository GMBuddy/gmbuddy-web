import CampaignsView from "./fetch/containers/CampaignsView";
import CampaignView from "./fetch/containers/CampaignView";
import CampaignCreator from "./create/containers/CampaignCreator";
import { simpleAuth } from "../auth/authMethods";

export default {
    childRoutes: [
        {
            component: CampaignView,
            onEnter: simpleAuth,
            path: "/:gameType/campaign/:campaignId",
        },
        {
            component: CampaignsView,
            onEnter: simpleAuth,
            path: "/:gameType/campaigns",
        },
        {
            component: CampaignCreator,
            onEnter: simpleAuth,
            path: "/campaign/create",
        },
    ],
};
