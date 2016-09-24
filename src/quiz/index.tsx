export { default as Quiz } from "./components/QuizItem";
export { default as Header } from "./components/Header";
export { default as MainSection } from "./components/MainSection";
export * from "./actions"

import * as model from "./model";
export { model };

import reducer from "./reducer";
export default reducer;
