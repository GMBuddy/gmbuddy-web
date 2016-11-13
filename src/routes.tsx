import MasterLayout from "./layout/containers/MasterLayout";
import HomeComponent from "./home/containers/Home";
import About from "./about/routes";
import Campaign from "./campaign/routes";
import CharacterCreator from "./character-creator/routes";
import CharacterViewer from "./character-viewer/routes";
import Auth from "./auth/routes";
import NotFound from "./layout/routes";

export default {
    childRoutes: [
        About,
        Auth,
        Campaign,
        CharacterCreator,
        CharacterViewer,
        NotFound,
    ],
    component: MasterLayout,
    indexRoute: { component: HomeComponent },
    path: "/",
};
