import { handleActions, Action } from "redux-actions";

import { ADD_QUIZ } from "./constants/actionTypes";
import { IState } from "./model";

const initialState: IState = [{
    id: 0,
    questions: [{id: 0, text: "Initial Question"}],
    text: "Initial Quiz",
}];

export default handleActions<IState>({
    [ADD_QUIZ]: (state: IState, action: Action): IState => {
        console.log(action);
        return [{
            id: state.reduce((maxId, quiz) => Math.max(quiz.id, maxId), -1) + 1,
            questions: [{id: 0, text: "Initial Question."}],
            text: action.payload.text,
        }, ...state];
    },
}, initialState);
