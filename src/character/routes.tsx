import CharacterCreator from "./containers/creator/CharacterCreator";
import CharacterViewer from "./containers/viewer/CharacterViewer";
import { simpleAuth } from "../auth/authMethods";

export default {
    childRoutes: [
        {
            component: CharacterCreator,
            onEnter: simpleAuth,
            path: "/character/create",
        },
        {
            component: CharacterViewer,
            onEnter: simpleAuth,
            path: "/character/view",
        },
    ],
};
