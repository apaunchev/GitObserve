import React from "react";
import { Link, NavLink, Route, Switch, Redirect } from "react-router-dom";
import "../../node_modules/@primer/css/build/build.css";
import NotFound from "./common/not-found";
import PullRequests from "./pulls";
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
          </nav>
        </div>
        <Avatar />
      </div>
    </header>
    <Switch>
      <Route path="/pulls" component={PullRequests} />
      <Route path="/settings" component={Settings} />
      <Route
        exact
        path="/"
        render={({ location: { state } }) => (
          <Redirect to={{ pathname: "/pulls", state }} />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
