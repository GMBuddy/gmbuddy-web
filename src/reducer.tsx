import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import quizzes from "./quiz";
import questions from "./question";

const rootReducer = combineReducers({
    quizzes,
    questions,
    routing: routerReducer,
});

export default rootReducer;
