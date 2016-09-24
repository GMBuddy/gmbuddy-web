/* tslint:disable:no-reference */
/// <reference path='../typings/index.d.ts'/>
/* tslint:enable:no-reference */

import * as React from "react";
import { render } from "react-dom";
import { IStore, createStore } from "redux";
import { Provider } from "react-redux";

import App from "./main/components/App";
import rootReducer from "./main/reducer";

const initialState = {};

const store: IStore<any> = createStore(rootReducer, initialState);

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("app")
);
