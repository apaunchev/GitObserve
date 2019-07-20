import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import "../../node_modules/@primer/css/build/build.css";
import NotFound from "./common/not-found";
import Dashboard from "./dashboard";
import Releases from "./releases";
import Settings from "./settings";
import Avatar from "./common/avatar";

const App = () => (
  <div className="App">
    <header className="App-header p-3 bg-gray-dark text-white">
      <div className="container-lg d-flex flex-items-center">
        <div className="flex-auto d-flex flex-items-baseline">
          <h1 className="h2">
            <Link to="/" className="text-white no-underline">
              GitObserve
            </Link>
          </h1>
          <nav>
            <NavLink
              to="/pulls"
              className="ml-4 f4 text-white"
              activeClassName="text-underline"
            >
              Pull requests
            </NavLink>
            <NavLink
              to="/releases"
              className="ml-3 f4 text-white"
              activeClassName="text-underline"
            >
              Releases
            </NavLink>
          </nav>
        </div>
        <Avatar />
      </div>
    </header>
    <Switch>
      <Route path="/pulls" component={Dashboard} />
      <Route path="/releases" component={Releases} />
      <Route path="/settings" component={Settings} />
      <Route exact path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
