import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import authReducer from "./auth/actions/reducer";
import campaignReducer from "./campaign/actions/reducer";
import campaignCreatorReducer from "./campaign-creator/actions/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    campaign: combineReducers({campaignReducer, campaignCreatorReducer}),
    routing: routerReducer,
});

export default rootReducer;
