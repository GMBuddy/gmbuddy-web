import { handleActions, Action } from "redux-actions";

import { ADD_QUIZ } from "./constants/actionTypes";
import { IState } from "./model";

const initialState: IState = [{
    id: 0,
    text: "Initial Quiz",
}];

export default handleActions<IState>({
    [ADD_QUIZ]: (state: IState, action: Action): IState => {
        return [{
            id: state.reduce((maxId, quiz) => Math.max(quiz.id, maxId), -1) + 1,
            text: action.payload.text,
        }, ...state];
    },
}, initialState);
