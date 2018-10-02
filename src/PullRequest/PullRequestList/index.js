import { map } from "lodash";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { Component } from "react";

import FetchMore from "../../FetchMore";
import Loading from "../../Loading";

import { makeAPICall } from "../../api";
import { STATUS, LOCAL_STORAGE_KEY } from "../../consts";
import { getRepositoryPullRequests } from "../queries";

dayjs.extend(relativeTime);

class PullRequests extends Component {
  state = {
    status: STATUS.INITIAL,
    error: null,
    data: null
  };

  componentDidMount() {
    const { repositoryOwner, repositoryName } = this.props;

    this.fetchData({ repositoryOwner, repositoryName });
  }

  fetchData = ({ repositoryOwner, repositoryName, pullRequestState, cursor }) => {
    this.setState({ status: STATUS.LOADING });

    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);

    if (!storedToken) {
      return this.setState({
        error: "GitHub token missing.",
        status: STATUS.READY
      });
    }

    makeAPICall(
      getRepositoryPullRequests(repositoryOwner, repositoryName, "OPEN", cursor),
      storedToken
    ).then(response => {
      const { data } = response.data;

      this.setState(prevState => {
        let newStateData = {};

        if (!prevState.data) {
          newStateData = data;
        } else {
          newStateData = {
            repository: {
              ...prevState.data.repository,
              pullRequests: {
                ...prevState.data.repository.pullRequests,
                edges: [
                  ...prevState.data.repository.pullRequests.edges,
                  ...data.repository.pullRequests.edges
                ],
                pageInfo: {
                  ...prevState.data.repository.pullRequests.pageInfo,
                  ...data.repository.pullRequests.pageInfo
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
    const { status, error, data } = this.state;
    const { repositoryOwner, repositoryName } = this.props;

    if (status !== STATUS.READY && !data) {
      return <Loading />;
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

    const pageInfo = data.repository.pullRequests.pageInfo;
    const pullRequests = map(data.repository.pullRequests.edges, "node");

    if (!pullRequests.length) {
      return (
        <div className="Issues">
          <p>No pull requests yet.</p>
        </div>
      );
    }

    return (
      <div className="Issues">
        <ol className="IssueList">
          {pullRequests.map(({ id, url, title, author, createdAt }) => (
            <li className="Issue" key={id}>
              <h5>
                <a href={url}>{title}</a>
              </h5>
              <p>
                {author && (
                  <span>
                    Opened by <a href={author.url}>{author.login}</a>
                  </span>
                )}
                {createdAt && <span title={createdAt}> {dayjs(createdAt).fromNow()}</span>}
              </p>
            </li>
          ))}
        </ol>

        {status === STATUS.LOADING && <Loading />}

        <FetchMore
          loading={status === STATUS.LOADING}
          hasNextPage={pageInfo.hasNextPage}
          variables={{
            cursor: pageInfo.endCursor,
            repositoryOwner,
            repositoryName
          }}
          fetchMore={this.fetchData}
        >
          Pull Requests
        </FetchMore>
      </div>
    );
  }
}

export default PullRequests;
