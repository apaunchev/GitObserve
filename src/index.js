import { throttle } from "lodash";
import React from "react";
import { render } from "react-dom";
import Root from "./components/root";
import configureStore from "./configureStore";
import { saveState } from "./localStorage";

const store = configureStore();

store.subscribe(
  throttle(() => {
    saveState({
      settings: store.getState().settings,
      pulls: store.getState().pulls,
      releases: store.getState().releases,
      watchedRepos: store.getState().watchedRepos
    });
  }),
  1000
);

render(<Root store={store} />, document.getElementById("root"));
