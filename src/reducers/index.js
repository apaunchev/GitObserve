import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import homeReducer from "./home";
import setupReducer from "./setup";
import selectReducer from "./select";

const persistSetupConfig = { key: "setup", storage };
const persistHomeConfig = { key: "home", storage };
const persistSelectConfig = { key: "select", storage };

const rootReducer = history =>
  combineReducers({
    home: persistReducer(persistHomeConfig, homeReducer),
    setup: persistReducer(persistSetupConfig, setupReducer),
    select: persistReducer(persistSelectConfig, selectReducer),
    router: connectRouter(history)
  });

export default rootReducer;
