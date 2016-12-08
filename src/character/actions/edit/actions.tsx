import { createAction } from "redux-actions";
import { EDIT_CHARACTER_REQUEST, EDIT_CHARACTER_SUCCESS, EDIT_CHARACTER_INVALID } from "./actionTypes";

const requestEditCharacter = createAction(
    EDIT_CHARACTER_REQUEST,
);

const editCharacterInvalid = createAction(
    EDIT_CHARACTER_INVALID,
    (message: string) => message,
);

const editCharacterSuccess = createAction(
    EDIT_CHARACTER_SUCCESS,
);

export {
    requestEditCharacter,
    editCharacterInvalid,
    editCharacterSuccess,
};
