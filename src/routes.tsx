import * as React from "react";
import { Route, IndexRoute } from "react-router";

import MasterLayout from "./layout/components/MasterLayout";
import NotFound from "./layout/components/NotFound";
import QuizView from "./quiz/components/MainView";
import QuestionView from "./question/components/MainSection";

const routeMap = (
    <Route path="/" component={MasterLayout}>
        <IndexRoute component={QuizView}/>
        <Route path="/questions" component={QuestionView}/>
        <Route path="*" component={NotFound} />
    </Route>
);

export default routeMap;
