import { handleActions, Action } from "redux-actions";

import { ADD_QUESTION } from "./constants/actionTypes";
import { IState } from "./model";

const initialState: IState = [];

export const getQuestions = (state) => state.questions;

export default handleActions<IState>({
    [ADD_QUESTION]: (state: IState, action: Action): IState => {
        return [{
            id: state.reduce((maxId, question) => Math.max(question.id, maxId), -1) + 1,
            text: action.payload.text,
        }, ...state];
    },
}, initialState);
