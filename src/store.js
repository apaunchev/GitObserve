import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import { loadState, saveState } from "./localStorage";
import setup from "./reducers/setup";

const reducer = combineReducers({ setup });
const middleware = [thunk];
const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(throttle(() => saveState(store.getState())), 1000);

export default store;
