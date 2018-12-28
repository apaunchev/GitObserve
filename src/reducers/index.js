import { combineReducers } from "redux";
import dashboard from "./dashboard";
import watchedRepos from "./watchedRepos";
import settings from "./settings";

const rootReducer = combineReducers({
  dashboard,
  watchedRepos,
  settings
});

export default rootReducer;
