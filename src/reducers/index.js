import { combineReducers } from "redux";
import dashboard from "./dashboard";
import releases from "./releases";
import settings from "./settings";
import watchedRepos from "./watchedRepos";

const rootReducer = combineReducers({
  dashboard,
  releases,
  watchedRepos,
  settings
});

export default rootReducer;
