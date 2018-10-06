import { map } from "lodash";
import React, { Component } from "react";

import RepositoryItem from "../RepositoryItem";
import Issues from "../../Issue";
import FetchMore from "../../FetchMore";

import { makeAPICall } from "../../api";
import { STATUS, LOCAL_STORAGE_KEY } from "../../consts";
import { getWatchedRepositories } from "../queries";

import "./style.css";

class RepositoryList extends Component {
  state = {
    status: STATUS.INITIAL,
    error: null,
    data: null
  };

  componentDidMount() {
    this.fetchData({ cursor: null });
  }

  fetchData = ({ cursor }) => {
    this.setState({ status: STATUS.LOADING });

    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);

    if (!storedToken) {
      return this.setState({
        error: "GitHub token missing.",
        status: STATUS.READY
      });
    }

    makeAPICall(getWatchedRepositories(cursor), storedToken).then(response => {
      const { data } = response.data;

      this.setState(prevState => {
        let newStateData = {};

        if (!prevState.data) {
          newStateData = data;
        } else {
          newStateData = {
            viewer: {
              ...prevState.data.viewer,
              watching: {
                ...prevState.data.viewer.watching,
                edges: [...prevState.data.viewer.watching.edges, ...data.viewer.watching.edges],
                pageInfo: {
                  ...prevState.data.viewer.watching.pageInfo,
                  ...data.viewer.watching.pageInfo
                }
              }
            }
          };
        }

        return {
          data: newStateData,
          status: STATUS.READY
        };
      });
    });
  };

  render() {
    const { status, data, error } = this.state;

    if (status !== STATUS.READY && !data) {
      return <RepositoryListPlaceholder />;
    }

    if (error) {
      return (
        <div className="flash flash-error">
          <button onClick={this.fetchData} className="btn btn-sm primary flash-action">
            Retry
          </button>
          {error}
        </div>
      );
    }

    const {
      watching,
      watching: {
        pageInfo: { hasNextPage, endCursor }
      }
    } = data.viewer;
    const repositories = map(watching.edges, "node");

    return (
      <>
        <ol className="RepositoryList">
          {repositories.map(repository => (
            <div key={repository.id} className="RepositoryItem">
              <RepositoryItem {...repository} />
              <details>
                <summary>Issues ({repository.issues.totalCount})</summary>
                <Issues
                  entity={"issues"}
                  repositoryOwner={repository.owner.login}
                  repositoryName={repository.name}
                />
              </details>
              <details>
                <summary>Pull requests ({repository.pullRequests.totalCount})</summary>
                <Issues
                  entity={"pullRequests"}
                  repositoryOwner={repository.owner.login}
                  repositoryName={repository.name}
                />
              </details>
            </div>
          ))}
        </ol>

        {status === STATUS.LOADING && <RepositoryListPlaceholder />}

        <FetchMore
          loading={status === STATUS.LOADING}
          hasNextPage={hasNextPage}
          variables={{
            cursor: endCursor
          }}
          fetchMore={this.fetchData}
        >
          Repositories
        </FetchMore>
      </>
    );
  }
}

const RepositoryListPlaceholder = () => (
  <ol className="RepositoryList">
    {Array(10)
      .fill("")
      .map((item, index) => (
        <li key={index} className="RepositoryItem RepositoryItem-placeholder">
          <div className="RepositoryItem-placeholder-name" />
          <div className="RepositoryItem-placeholder-text" />
          <div className="RepositoryItem-placeholder-text" />
        </li>
      ))}
  </ol>
);

export default RepositoryList;
