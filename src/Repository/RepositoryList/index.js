import { map } from "lodash";
import axios from "axios";
import React, { Component } from "react";

import RepositoryItem from "../RepositoryItem";
import FetchMore from "../../FetchMore";

import { GITHUB_GRAPHQL_API, LOCAL_STORAGE_KEY } from "../../consts";
import { getWatchedRepositories } from "../queries";

import "./style.css";

class RepositoryList extends Component {
  state = {
    data: null,
    error: false,
    loading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = cursor => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);

    if (!storedToken) {
      return this.setState({
        error: "GitHub token missing, please login and try again.",
        loading: false
      });
    }

    this.setState({ loading: true });

    return axios
      .post(
        GITHUB_GRAPHQL_API,
        { query: getWatchedRepositories(cursor) },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(response => {
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
            loading: false
          };
        });
      })
      .catch(error => {
        console.error(`Error while fetching data: ${error}`);
        this.setState({ error: "There was a problem loading your repositories.", loading: false });
      });
  };

  render() {
    const { data, error, loading } = this.state;

    if (loading && !data) {
      return <RepositoryListPlaceholder />;
    }

    if (error) {
      return (
        <div class="flash flash-error">
          <button onClick={this.fetchData} class="btn btn-sm primary flash-action">
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
            </div>
          ))}
        </ol>

        {loading && <RepositoryListPlaceholder />}

        <FetchMore
          loading={loading}
          hasNextPage={hasNextPage}
          cursor={endCursor}
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
