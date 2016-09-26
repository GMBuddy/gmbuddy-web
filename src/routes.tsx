import * as React from "react";
import { Route, IndexRoute } from "react-router";

import MasterLayout from "./layout/components/MasterLayout";
import NotFound from "./layout/components/NotFound";
import Quizzes from "./quiz/containers/Quizzes";

const routeMap = (
    <Route path="/" component={MasterLayout}>
        <IndexRoute component={Quizzes}/>
        <Route path="*" component={NotFound} />
    </Route>
);

export default routeMap;
