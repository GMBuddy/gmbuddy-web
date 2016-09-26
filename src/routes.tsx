import MasterLayout from "./layout/components/MasterLayout";
import HomeComponent from "./home/containers/Home";
import About from "./about/routes";
import NotFound from "./layout/routes";

export default {
    childRoutes: [
        About,
        NotFound,
    ],
    component: MasterLayout,
    indexRoute: { component: HomeComponent },
    path: "/",

};
