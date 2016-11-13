import LoginPage from "./containers/LoginPage";
import Register from "./containers/Register";
import { authLoggedOut } from "./authMethods";

export default {
    childRoutes: [
        {
            component: LoginPage,
            onEnter: authLoggedOut,
            path: "/login",
        },
        {
            component: Register,
            onEnter: authLoggedOut,
            path: "/register",
        },
    ],
};
