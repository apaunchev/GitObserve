import { combineReducers } from "redux";
import dashboard from "./dashboard";
import settings from "./settings";
import watchedRepos from "./watchedRepos";

const rootReducer = combineReducers({
  dashboard,
  watchedRepos,
  settings
});

export default rootReducer;
