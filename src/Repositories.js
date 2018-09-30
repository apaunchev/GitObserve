import _ from "lodash";
import axios from "axios";
import React, { Component, Fragment } from "react";

import RepositoriesList from "./RepositoriesList";
import RepositoriesPlaceholder from "./RepositoriesPlaceholder";
import FetchMore from "./FetchMore";

import { GITHUB_GRAPHQL_API, LOCAL_STORAGE_KEY } from "./consts";
import { getWatchedRepositories } from "./queries";

class Repositories extends Component {
  state = {
    data: null,
    error: false,
    loading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (endCursor = "") => {
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
        { query: getWatchedRepositories(endCursor) },
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
      return <RepositoriesPlaceholder />;
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
    const repositories = _.map(watching.edges, "node");

    return (
      <Fragment>
        <RepositoriesList repositories={repositories} />
        {loading && <RepositoriesPlaceholder />}
        <FetchMore
          loading={loading}
          hasNextPage={hasNextPage}
          endCursor={endCursor}
          fetchMore={this.fetchData}
        >
          Repositories
        </FetchMore>
      </Fragment>
    );
  }
}

export default Repositories;
