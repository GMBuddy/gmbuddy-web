import { Schema, arrayOf } from "normalizr";

export const character = new Schema("character", {idAttribute: "characterId"});
export const arrayOfCharacters = arrayOf(character);
