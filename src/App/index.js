import axios from "axios";
import React, { Component } from "react";

import Avatar from "../Avatar";
import RepositoryList from "../Repository";
import Loading from "../Loading";

import {
  STATUS,
  LOCAL_STORAGE_KEY,
  AUTH_API_URI,
  GITHUB_OAUTH_URL,
  CLIENT_ID,
  REDIRECT_URI
} from "../consts";

import "primer/build/build.css";
import "./style.css";

class App extends Component {
  state = {
    status: STATUS.INITIAL
  };

  componentDidMount() {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);
    if (storedToken) {
      this.setState({ status: STATUS.AUTHENTICATED });
      return;
    }

    const code =
      window.location.href.match(/\?code=(.*)/) && window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      this.setState({ status: STATUS.LOADING }, () => this.authenticate(code));
    }
  }

  authenticate(code) {
    axios
      .get(`${AUTH_API_URI}/${code}`)
      .then(({ data: { token } }) => {
        if (token) {
          localStorage.setItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN, token);
          this.setState({ token, status: STATUS.AUTHENTICATED });
        }
      })
      .catch(error => console.error(`Error while authenticating: ${error}`));
  }

  render() {
    const { status } = this.state;

    return (
      <div className="App">
        <header className="Header">
          <div className="Logo">GitObserve</div>
          <div className="User">
            {status === STATUS.INITIAL && (
              <a
                href={`${GITHUB_OAUTH_URL}?client_id=${CLIENT_ID}&scope=user%20repo%20read%3Aorg&redirect_uri=${REDIRECT_URI}`}
              >
                Login
              </a>
            )}
            {status === STATUS.AUTHENTICATED && <Avatar />}
          </div>
        </header>
        <div className="Main">
          {status === STATUS.LOADING && <Loading isCenter={true} />}
          {status === STATUS.AUTHENTICATED && <RepositoryList />}
        </div>
      </div>
    );
  }
}

export default App;
