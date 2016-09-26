export { default as Question } from "./components/QuestionItem";
export { default as Header } from "./components/Header";
export * from "./actions"

import * as model from "./model";
export { model };

import reducer from "./reducer";
export default reducer;
