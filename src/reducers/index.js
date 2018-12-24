import { combineReducers } from "redux";
import dashboard from "./dashboard";
import settings from "./settings";

const rootReducer = combineReducers({
  dashboard,
  settings
});

export default rootReducer;
