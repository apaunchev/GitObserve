import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import homeReducer from "./home";
import setupReducer from "./setup";

const persistSetupConfig = { key: "setup", storage };
const persistHomeConfig = { key: "home", storage };

const rootReducer = history =>
  combineReducers({
    home: persistReducer(persistHomeConfig, homeReducer),
    setup: persistReducer(persistSetupConfig, setupReducer),
    router: connectRouter(history)
  });

export default rootReducer;
