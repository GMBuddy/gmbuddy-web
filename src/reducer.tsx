import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import authReducer from "./auth/actions/reducer";
import campaignReducer from "./campaign/actions/reducer";
import characterReducer from "./character/actions/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    campaign: campaignReducer,
    character: characterReducer,
    routing: routerReducer,
});

export default rootReducer;
