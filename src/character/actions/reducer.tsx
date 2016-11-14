import { handleActions } from "redux-actions";
import { CREATE_CHARACTER_SUCCESS } from "./create/actionTypes";
import { merge, mapKeys } from "lodash";
import { FETCH_CHARACTER_SUCCESS, FETCH_CHARACTERS_SUCCESS } from "./fetch/actionTypes";
import { ICharacter } from "gmbuddy/character";

export default handleActions({
    /* FETCH */
    [FETCH_CHARACTER_SUCCESS]: (state, action: any) => {
        let char = {};
        char[action.payload.details.characterId] = action.payload;

        return merge({}, state, char);
    },
    [FETCH_CHARACTERS_SUCCESS]: (state, action: any) => {
        const newMap = mapKeys(action.payload.data, (value: ICharacter) => {
            return value.details.characterId;
        });

        return merge({}, state, newMap);
    },

    /* CREATE */
    [CREATE_CHARACTER_SUCCESS]: (state, action: any) => {
        let char = {};
        char[action.data.details.characterId] = action.data;

        return merge({}, state, char);
    },
}, {});
