import * as React from "react";


import MasterLayout from "./layout/components/MasterLayout";
import HomeComponent from "./home/containers/Home";
import NotFound from "./layout/routes";

export default {
    component: MasterLayout,
    path: "/",
    indexRoute: { component: HomeComponent },
    childRoutes: [
        NotFound
    ],
};

