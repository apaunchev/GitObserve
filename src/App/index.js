import axios from "axios";
import React, { Component } from "react";

import RepositoryList from "../Repository";

import { makeAPICall } from "../api";
import {
  STATUS,
  LOCAL_STORAGE_KEY,
  AUTH_API_URI,
  GITHUB_OAUTH_URL,
  CLIENT_ID,
  REDIRECT_URI
} from "../consts";
import { GET_VIEWER } from "./queries";

import "primer/build/build.css";
import "./style.css";

class App extends Component {
  state = {
    status: STATUS.INITIAL,
    error: null,
    data: null
  };

  componentDidMount() {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);

    if (storedToken) {
      this.setState({ status: STATUS.LOADING }, () => this.fetchViewerData(storedToken));
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
          this.fetchViewerData(token);
        }
      })
      .catch(error => console.error(`Error while authenticating: ${error}`));
  }

  fetchViewerData(token) {
    makeAPICall(GET_VIEWER, token).then(response =>
      this.setState({ data: response.data.data, status: STATUS.READY })
    );
  }

  render() {
    const { status, data } = this.state;

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
            {status === STATUS.READY &&
              data.viewer &&
              data.viewer.login && <a href={data.viewer.url}>@{data.viewer.login}</a>}
          </div>
        </header>
        <div className="Main container-md p-3">
          {status === STATUS.LOADING && <div className="Loading">Loading...</div>}
          {status === STATUS.READY && <RepositoryList />}
        </div>
      </div>
    );
  }
}

export default App;
