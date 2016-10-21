import LoginPage from "./containers/LoginPage";
import Register from "./containers/register";
import {authLoggedOut} from "./authMethods";

export default {
    childRoutes: [
        {
            component: LoginPage,
            path: "/login",
            onEnter: authLoggedOut,
        },
        {
            component: Register,
            path: "/register",
            onEnter: authLoggedOut,
        },
    ]
};
