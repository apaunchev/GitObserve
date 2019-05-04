import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "../../node_modules/@primer/css/build/build.css";
import NotFound from "./common/not-found";
import Dashboard from "./dashboard";
import Settings from "./settings";
import Avatar from "./common/avatar";

const App = () => (
  <div className="App">
    <header className="App-header p-3 bg-gray-dark text-white">
      <div className="container-lg d-flex flex-items-center">
        <h1 className="flex-auto h2">
          <Link to="/" className="text-white no-underline">
            GitObserve
          </Link>
        </h1>
        <Avatar />
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
