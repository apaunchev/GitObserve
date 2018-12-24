import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import NotFound from "./NotFound";

const activeStyle = { fontWeight: "bold" };

const App = () => (
  <div className="App">
    <nav>
      <div>
        <NavLink exact to="/" activeStyle={activeStyle}>
          Dashboard
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/settings" activeStyle={activeStyle}>
          Settings
        </NavLink>
      </div>
    </nav>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
