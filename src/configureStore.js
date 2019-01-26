import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { loadState } from "./localStorage";
import rootReducer from "./reducers";

const configureStore = () => {
  const persistedState = loadState();
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }

  return createStore(
    rootReducer,
    persistedState,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
