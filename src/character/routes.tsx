import CharacterCreator from "./creator/containers/CharacterCreator";
import CharacterViewer from "./viewer/containers/CharacterViewer";
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
