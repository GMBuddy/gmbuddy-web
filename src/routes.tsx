import * as React from "react";
import { Route, IndexRoute } from "react-router";

import MasterLayout from "./layout/components/MasterLayout";
import NotFound from "./layout/components/NotFound";
import Home from "./home/containers/Home";

const routeMap = (
    <Route path="/" component={MasterLayout}>
        <IndexRoute component={Home}/>
        <Route path="*" component={NotFound} />
    </Route>
);

export default routeMap;
