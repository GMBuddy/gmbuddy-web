import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import quizzes from "../quiz";

const rootReducer = combineReducers({
    quizzes,
    routing: routerReducer,
});

export default rootReducer;
