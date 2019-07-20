import { combineReducers } from "redux";
import pulls from "./pulls";
import releases from "./releases";
import settings from "./settings";
import watchedRepos from "./watchedRepos";

const rootReducer = combineReducers({
  pulls,
  releases,
  watchedRepos,
  settings
});

export default rootReducer;
