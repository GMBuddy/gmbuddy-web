import MasterLayout from "./layout/containers/MasterLayout";
import HomeComponent from "./home/containers/Home";
import About from "./about/routes";
import CampaignCreator from "./campaign-creator/routes";
import CharacterCreator from "./character-creator/routes";
import CharacterViewer from "./character-viewer/routes";
import Auth from "./auth/routes";
import NotFound from "./layout/routes";

export default {
    childRoutes: [
        About,
        Auth,
        CampaignCreator,
        CharacterCreator,
        CharacterViewer,
        NotFound,
    ],
    component: MasterLayout,
    indexRoute: { component: HomeComponent },
    path: "/",

};
