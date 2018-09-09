import _ from "lodash";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { Component } from "react";

import Issues from "./Issues";

import { STATUS, GITHUB_GRAPHQL_API, LOCAL_STORAGE_KEY } from "./consts";
import { GET_WATCHED_REPOSITORIES } from "./queries";

dayjs.extend(relativeTime);

class Repositories extends Component {
  state = {
    repositories: []
  };

  componentDidMount() {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);

    if (storedToken) {
      this.setState({
        status: STATUS.LOADING
      });

      axios
        .post(
          GITHUB_GRAPHQL_API,
          { query: GET_WATCHED_REPOSITORIES },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          }
        )
        .then(response => {
          const { viewer } = response.data.data;
          const repositories = _.map(viewer.watching.edges, "node");

          this.setState({
            repositories,
            status: STATUS.READY
          });
        })
        .catch(error => console.error(`Error fetching watched repositories: ${error}`));
    }
  }

  render() {
    const { status, repositories } = this.state;

    if (status === STATUS.LOADING) {
      return (
        <div className="container-md">
          <RepositoriesPlaceholder />
        </div>
      );
    }

    return (
      <div className="container-md">
        <RepositoriesList repositories={repositories} />
      </div>
    );
  }
}

const RepositoriesPlaceholder = () => (
  <ul className="Repositories">
    {Array(10)
      .fill("")
      .map((line, index) => (
        <li key={index} className="Repository Repository-placeholder">
          <div className="Repository-placeholder-name" />
          <div className="Repository-placeholder-text" />
          <div className="Repository-placeholder-text" />
        </li>
      ))}
  </ul>
);

const RepositoriesList = ({ repositories }) => (
  <ol className="Repositories">
    {repositories.map(
      ({ id, url, nameWithOwner, pushedAt, descriptionHTML, issues, pullRequests }) => (
        <li key={id} className="Repository">
          <h3>
            <a href={url}>{nameWithOwner}</a>
          </h3>
          <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
          <p>
            {pushedAt && (
              <span>
                Updated <span title={pushedAt}>{dayjs(pushedAt).fromNow()}</span>
              </span>
            )}
          </p>
          <details>
            <summary>Issues ({issues.totalCount})</summary>
            <Issues issues={issues} seeAllUrl={`${url}/issues`} />
          </details>
          <details>
            <summary>Pull requests ({pullRequests.totalCount})</summary>
            <Issues issues={pullRequests} seeAllUrl={`${url}/pulls`} />
          </details>
        </li>
      )
    )}
  </ol>
);

export default Repositories;
