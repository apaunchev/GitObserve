import Octicon, {
  CloudUpload as CloudUploadIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Repo as RepoIcon
} from "@githubprimer/octicons-react";
import React from "react";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import Account from "./account";
import Dashboard from "./dashboard";
import Repositories from "./repositories";

const Settings = ({ match }) => (
  <>
    <div className="App-menu p-3 bg-gray-light border-bottom">
      <div className="container-lg d-flex flex-items-center">
        <div className="flex-auto">
          <h1 className="h3">Settings</h1>
        </div>
        <div>
          <Link to="/" className="btn btn-primary">
            <Octicon icon={CloudUploadIcon} /> Save
          </Link>
        </div>
      </div>
    </div>
    <main className="App-main">
      <div className="container-lg py-4 d-flex">
        <div className="col-3 pr-4">
          <nav className="menu">
            <NavLink
              to={`${match.url}/dashboard`}
              className="menu-item"
              activeClassName="selected"
            >
              <Octicon icon={DashboardIcon} /> Dashboard
            </NavLink>
            <NavLink
              to={`${match.url}/account`}
              className="menu-item"
              activeClassName="selected"
            >
              <Octicon icon={PersonIcon} /> Account
            </NavLink>
            <NavLink
              to={`${match.url}/repositories`}
              className="menu-item"
              activeClassName="selected"
            >
              <Octicon icon={RepoIcon} /> Repositories
            </NavLink>
          </nav>
        </div>
        <div className="col-9">
          <Switch>
            <Route path={`${match.url}/dashboard`} component={Dashboard} />
            <Route path={`${match.url}/account`} component={Account} />
            <Route
              path={`${match.url}/repositories`}
              component={Repositories}
            />
            <Route
              exact
              path={`${match.url}`}
              render={() => <Redirect to={`${match.url}/dashboard`} />}
            />
          </Switch>
        </div>
      </div>
    </main>
  </>
);

export default Settings;
