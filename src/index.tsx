import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import "index.css";
import * as services from "services";
import { rootEpic } from "epics";
import { rootReducer } from "reducers";
import { App } from "./App";

const epicMiddleware = createEpicMiddleware({
  dependencies: services
});
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
