import { throttle } from "lodash";
import React from "react";
import { render } from "react-dom";
import Root from "./components/Root";
import configureStore from "./configureStore";
import { saveState } from "./localStorage";

const store = configureStore();

store.subscribe(
  throttle(() => {
    saveState({
      settings: store.getState().settings,
      dashboard: store.getState().dashboard,
      watchedRepos: store.getState().watchedRepos
    });
  }),
  1000
);

render(<Root store={store} />, document.getElementById("root"));
