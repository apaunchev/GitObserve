import axios from "axios";
import React, { Component } from "react";

import WatchingRepositories from "../WatchingRepositories";
import Loading from "../Loading";

import {
  STATUS,
  LOCAL_STORAGE_KEY,
  AUTH_API_URI,
  GITHUB_OAUTH_URL,
  CLIENT_ID,
  REDIRECT_URI
} from "../consts";

import "./style.css";

class App extends Component {
  state = {
    status: STATUS.INITIAL
  };

  componentDidMount() {
    const storedToken = window.localStorage.getItem(
      LOCAL_STORAGE_KEY.GITHUB_TOKEN
    );

    if (storedToken) {
      this.setState({ status: STATUS.AUTHENTICATED });
      return;
    }

    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];

    if (code) {
      this.setState({ status: STATUS.LOADING }, () => this.authenticate(code));
    }
  }

  authenticate(code) {
    axios
      .get(`${AUTH_API_URI}/${code}`)
      .then(({ data: { token } }) => {
        if (token) {
          window.localStorage.setItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN, token);
          this.setState({ token, status: STATUS.AUTHENTICATED });
        }
      })
      .catch(error => console.error(`Error while authenticating: ${error}`));
  }

  logout = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);
    this.setState({ token: null, status: STATUS.INITIAL });
  };

  render() {
    const { status } = this.state;

    return (
      <div className="App">
        <header className="Header">
          <div className="Logo">
            <a href={process.env.REACT_APP_REDIRECT_URI}>GitObserve</a>
          </div>
          <div>
            {status === STATUS.INITIAL && (
              <a
                className="text-white"
                href={`${GITHUB_OAUTH_URL}?client_id=${CLIENT_ID}&scope=user%20repo%20read%3Aorg&redirect_uri=${REDIRECT_URI}`}
              >
                Login
              </a>
            )}
            {status === STATUS.AUTHENTICATED && (
              <button className="btn-link text-white" onClick={this.logout}>
                Logout
              </button>
            )}
          </div>
        </header>
        <div className="Main">
          {status === STATUS.LOADING && <Loading />}
          {status === STATUS.AUTHENTICATED && <WatchingRepositories />}
        </div>
      </div>
    );
  }
}

export default App;
