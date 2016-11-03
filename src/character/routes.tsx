import CharacterCreator from "./creator/containers/CharacterCreator";
import CharacterViewer from "./viewer/containers/CharacterViewer";
import Micro20CharacterViewer from "./viewer/containers/Micro20CharacterViewer";
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
        {
            component: Micro20CharacterViewer,
            onEnter: simpleAuth,
            path: "/:gameType/characters/:characterId",
        },
    ],
};
