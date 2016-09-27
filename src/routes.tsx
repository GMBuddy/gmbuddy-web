import MasterLayout from "./layout/containers/MasterLayout";
import HomeComponent from "./home/containers/Home";
import About from "./about/routes";
import Auth from "./auth/routes";
import NotFound from "./layout/routes";

export default {
    childRoutes: [
        About,
        Auth,
        NotFound,
    ],
    component: MasterLayout,
    indexRoute: { component: HomeComponent },
    path: "/",

};
