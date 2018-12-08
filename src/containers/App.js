import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Select from "../components/Select";
import Setup from "../components/Setup";
import NoMatch from "../components/NoMatch";

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
        <NavLink exact to="/select" activeStyle={activeStyle}>
          Select
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/setup" activeStyle={activeStyle}>
          Setup
        </NavLink>
      </div>
    </nav>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/select" component={Select} />
      <Route path="/setup" component={Setup} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default App;
