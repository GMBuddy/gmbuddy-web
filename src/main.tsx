/* tslint:disable:no-reference */
/// <reference path='../typings/index.d.ts'/>
/* tslint:enable:no-reference */

import * as React from "react";
import { render } from "react-dom";
import { IStore, createStore } from "redux";
import { Provider } from "react-redux";

import "./main.scss";

import rootReducer from "./reducer";

import routes from "./routes";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

const store: IStore<any> = createStore(rootReducer);
const history = syncHistoryWithStore(browserHistory, store);

import * as injectTapEventPluginExport from "react-tap-event-plugin";
const injectTapEventPlugin = (injectTapEventPluginExport as any).default;
// noinspection TypeScriptValidateTypes
injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router store={store} history={history}>{routes}</Router>
    </Provider>
    , document.getElementById("app")
);
