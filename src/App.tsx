import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import * as services from "services";
import { rootEpic } from "epics";
import { rootReducer } from "reducers";
import { AppRouter } from "routes";

const epicMiddleware = createEpicMiddleware({
  dependencies: services
});
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

export const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
