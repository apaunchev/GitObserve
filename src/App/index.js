import axios from "axios";
import React, { Component } from "react";

import RepositoryList from "../Repository";

import {
  STATUS,
  LOCAL_STORAGE_KEY,
  GITHUB_GRAPHQL_API,
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
    viewer: {}
  };

  componentDidMount() {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);

    if (storedToken) {
      this.setState(
        {
          status: STATUS.AUTHENTICATED
        },
        () => this.fetchViewerData(storedToken)
      );
    }

    const code =
      window.location.href.match(/\?code=(.*)/) && window.location.href.match(/\?code=(.*)/)[1];

    if (code) {
      this.setState({
        status: STATUS.LOADING
      });

      axios
        .get(`${AUTH_API_URI}/${code}`)
        .then(({ data: { token } }) => {
          if (token) {
            localStorage.setItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN, token);

            this.setState(
              {
                status: STATUS.AUTHENTICATED
              },
              () => this.fetchViewerData(token)
            );
          }
        })
        .catch(error => console.error(`Error while authenticating: ${error}`));
    }
  }

  fetchViewerData(token) {
    return axios
      .post(
        GITHUB_GRAPHQL_API,
        { query: GET_VIEWER },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        const {
          viewer: { login, url }
        } = response.data.data;

        this.setState({
          viewer: {
            login,
            url
          }
        });
      })
      .catch(error => console.error(`Error fetching viewer: ${error}`));
  }

  render() {
    const { status, viewer } = this.state;

    return (
      <div className="App">
        <header className="Header">
          <div className="Logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="Logo-icon"
            >
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <path d="M13 6h3a2 2 0 0 1 2 2v7" />
              <line x1="6" y1="9" x2="6" y2="21" />
            </svg>
            <span className="Logo-type">GitObserve</span>
          </div>
          <div className="User">
            {status === STATUS.INITIAL && (
              <a
                href={`${GITHUB_OAUTH_URL}?client_id=${CLIENT_ID}&scope=user%20repo%20read%3Aorg&redirect_uri=${REDIRECT_URI}`}
              >
                Login
              </a>
            )}
            {status === STATUS.AUTHENTICATED &&
              viewer.login && <a href={viewer.url}>@{viewer.login}</a>}
          </div>
        </header>
        <div className="Main container-md p-3">
          {status === STATUS.LOADING && <div className="Loading">Loading...</div>}
          {status === STATUS.AUTHENTICATED && <RepositoryList />}
        </div>
      </div>
    );
  }
}

export default App;
