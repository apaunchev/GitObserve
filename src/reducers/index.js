import { combineReducers } from "redux";
import home from "./home";
import setup from "./setup";
import select from "./select";

const rootReducer = combineReducers({
  home,
  setup,
  select
});

export default rootReducer;
