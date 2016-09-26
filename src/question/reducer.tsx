import { handleActions, Action } from "redux-actions";

import { ADD_QUESTION } from "./constants/actionTypes";
import { IState } from "./model";

const initialState: IState = [{
    id: 0,
    quizId: 0,
    text: "Initial Question",
}];

export default handleActions<IState>({
    [ADD_QUESTION]: (state: IState, action: Action): IState => {
        return [{
            id: state.reduce((maxId, quiz) => Math.max(quiz.id, maxId), -1) + 1,
            quizId: action.payload.quizId,
            text: action.payload.text,
        }, ...state];
    },
}, initialState);
