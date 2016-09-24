import { createAction } from "redux-actions";

import { ADD_QUIZ } from "./constants/actionTypes";
import { Quiz } from "./model";

const addQuiz = createAction<Quiz>(
    ADD_QUIZ,
    (text: string) => ({ text })
);

export { addQuiz };
