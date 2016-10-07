/* tslint:disable:no-reference */
/// <reference path='../typings/index.d.ts'/>
/* tslint:enable:no-reference */

import * as React from "react";
import { render } from "react-dom";
import { IStore, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import "./main.scss";

import rootReducer from "./reducer";

import routes from "./routes";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

const enhancer = window['devToolsExtension'] ? window['devToolsExtension']()(createStore) : createStore;
const store: IStore<any> = applyMiddleware(thunk)(enhancer)(rootReducer);

const history = syncHistoryWithStore(browserHistory, store);

import * as injectTapEventPluginExport from "react-tap-event-plugin";
const injectTapEventPlugin = (injectTapEventPluginExport as any).default;
// noinspection TypeScriptValidateTypes
injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router store={store} history={history} routes={routes}/>
    </Provider>
    , document.getElementById("app")
);
