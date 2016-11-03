import { createAction } from "redux-actions";
import { CREATE_CHARACTER_REQUEST, CREATE_CHARACTER_SUCCESS, CREATE_CHARACTER_INVALID } from "./actionTypes";

const requestCreateCharacter = createAction(
    CREATE_CHARACTER_REQUEST,
);

const createCharacterInvalid = createAction(
    CREATE_CHARACTER_INVALID,
    (message: string) => message,
);

const createCharacterSuccess = createAction(
    CREATE_CHARACTER_SUCCESS,
);

export {
    requestCreateCharacter,
    createCharacterInvalid,
    createCharacterSuccess,
};
