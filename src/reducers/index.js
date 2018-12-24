import { combineReducers } from "redux";
import home from "./home";
import select from "./select";

const rootReducer = combineReducers({
  home,
  select
});

export default rootReducer;
