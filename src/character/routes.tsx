import CharacterCreator from "./creator/containers/CharacterCreator";
import { simpleAuth } from "../auth/authMethods";
import CharacterView from "./fetch/containers/CharacterView";
import CharactersView from "./fetch/containers/CharactersView";
import AllCharactersView from "./fetch/containers/AllCharactersView";

export default {
    childRoutes: [
        {
            component: CharacterCreator,
            onEnter: simpleAuth,
            path: "/character/create",
        },
        {
            component: CharacterView,
            onEnter: simpleAuth,
            path: "/:gameType/characters/:characterId",
        },
        {
            component: CharactersView,
            onEnter: simpleAuth,
            path: "/:gameType/characters",
        },
        {
            component: AllCharactersView,
            onEnter: simpleAuth,
            path: "/characters",
        },
    ],
};
