import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import NotFound from "./NotFound";

import "../../node_modules/primer/build/build.css";

const App = () => (
  <div className="App">
    <header className="App-header p-3 bg-gray-dark text-white">
      <div className="container-lg d-flex flex-items-center">
        <h1 className="flex-auto h2">
          <Link to="/" className="text-white">
            GitObserve
          </Link>
        </h1>
      </div>
    </header>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
