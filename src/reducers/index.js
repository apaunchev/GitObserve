import { combineReducers } from "redux";
import pulls from "./pulls";
import settings from "./settings";
import watchedRepos from "./watchedRepos";

const rootReducer = combineReducers({
  pulls,
  watchedRepos,
  settings,
});

export default rootReducer;
