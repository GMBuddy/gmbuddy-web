import { handleActions, Action } from "redux-actions";

import { ADD_QUESTION } from "./constants/actionTypes";
import { IState } from "./model";

const initialState: IState = [{
    id: 0,
    text: "Initial Question",
}];

export default handleActions<IState>({
    [ADD_QUESTION]: (state: IState, action: Action): IState => {
        console.log(action, state);
        return [{
            id: state.reduce((maxId, quiz) => Math.max(quiz.id, maxId), -1) + 1,
            text: action.payload.text,
        }, ...state];
    },
}, initialState);
