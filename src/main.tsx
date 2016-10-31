/* tslint:disable:no-reference */
/// <reference path='../typings/index.d.ts'/>
/* tslint:enable:no-reference */

import * as React from "react";
import { render } from "react-dom";
import { IStore, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import * as ES6Promise from "es6-promise"

import "./main.scss";

import rootReducer from "./reducer";

import routes from "./routes";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

// We have to force tslint allow this, so that the redux devtools can mount properly.
/* tslint:disable */
const enhancer = window["devToolsExtension"] ? window["devToolsExtension"]()(createStore) : createStore;
/* tslint: enable */

export const store: IStore<any> = applyMiddleware(thunk, routerMiddleware(browserHistory))(enhancer)(rootReducer);

const history = syncHistoryWithStore(browserHistory, store);

import * as injectTapEventPluginExport from "react-tap-event-plugin";
import {authSuccess} from "./auth/actions/actions";
const injectTapEventPlugin = (injectTapEventPluginExport as any).default;
// noinspection TypeScriptValidateTypes
injectTapEventPlugin();

// Support fetch on IE.
ES6Promise.polyfill();

// Login if there's a JWT stored in LocalStorage.
const jwt = JSON.parse(localStorage.getItem('auth'));
if (jwt) {
    store.dispatch(authSuccess(jwt));
}

render(
    <Provider store={store}>
        <Router store={store} history={history} routes={routes}/>
    </Provider>
    , document.getElementById("app")
);
