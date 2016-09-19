import { createAction } from "redux-actions";

import { ADD_QUESTION } from "./constants/actionTypes";
import { Question } from "./model";

const addQuestion = createAction<Question>(
    ADD_QUESTION,
    (text: string) => ({ text })
);

export { addQuestion };
