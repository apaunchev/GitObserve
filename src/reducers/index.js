import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import homeReducer from "./home";
import setupReducer from "./setup";

const rootReducer = history =>
  combineReducers({
    home: homeReducer,
    setup: setupReducer,
    router: connectRouter(history)
  });

export default rootReducer;
