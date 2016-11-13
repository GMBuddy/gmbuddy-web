import CharacterCreator from "./containers/CharacterCreator";
import { simpleAuth } from "../auth/authMethods";

export default {
    component: CharacterCreator,
    onEnter: simpleAuth,
    path: "/character/create",
};
