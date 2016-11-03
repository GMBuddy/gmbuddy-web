import { handleActions } from "redux-actions";
import { CREATE_CHARACTER_SUCCESS } from "./create/actionTypes";
import { merge } from "lodash";
import { normalize }  from "normalizr";
import { character } from "./models";

export default handleActions({
    /* CREATE */
    [CREATE_CHARACTER_SUCCESS]: (state, action: any) => {
        const norm = normalize(action.data, character);

        return merge({}, state, norm.entities.character);
    },
}, {});
