import { createAction } from "redux-actions";
import { FETCH_CHARACTER_REQUEST, FETCH_CHARACTER_SUCCESS, FETCH_CHARACTER_INVALID,
         FETCH_CHARACTERS_REQUEST, FETCH_CHARACTERS_SUCCESS, FETCH_CHARACTERS_INVALID } from "./actionTypes";

const requestFetchCharacter = createAction(
    FETCH_CHARACTER_REQUEST,
);

const fetchCharacterInvalid = createAction(
    FETCH_CHARACTER_INVALID,
);

const fetchCharacterSuccess = createAction(
    FETCH_CHARACTER_SUCCESS,
    (data: Object) => data,
);

const requestFetchCharacters = createAction(
    FETCH_CHARACTERS_REQUEST,
);

const fetchCharactersInvalid = createAction(
    FETCH_CHARACTERS_INVALID,
);

const fetchCharactersSuccess = createAction(
    FETCH_CHARACTERS_SUCCESS,
);

export {
    requestFetchCharacter,
    fetchCharacterInvalid,
    fetchCharacterSuccess,
    requestFetchCharacters,
    fetchCharactersInvalid,
    fetchCharactersSuccess,
};
