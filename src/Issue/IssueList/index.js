import { map } from "lodash";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { Component } from "react";

import IssueItem from "../IssueItem";
import FetchMore from "../../FetchMore";
import Loading from "../../Loading";

import { makeAPICall } from "../../api";
import { STATUS, LOCAL_STORAGE_KEY } from "../../consts";
import { getRepositoryIssues } from "../queries";

import "./style.css";

dayjs.extend(relativeTime);

class Issues extends Component {
  state = {
    status: STATUS.INITIAL,
    error: null,
    data: null
  };

  componentDidMount() {
    const { entity, repositoryOwner, repositoryName } = this.props;
    this.fetchIssues({ entity, repositoryOwner, repositoryName });
  }

  fetchIssues = ({ entity, repositoryOwner, repositoryName, issueState, cursor }) => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);

    this.setState({ status: STATUS.LOADING });

    makeAPICall(
      getRepositoryIssues({ entity, repositoryOwner, repositoryName, issueState, cursor }),
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
              [entity]: {
                ...prevState.data.repository[entity],
                edges: [
                  ...prevState.data.repository[entity].edges,
                  ...data.repository[entity].edges
                ],
                pageInfo: {
                  ...prevState.data.repository[entity].pageInfo,
                  ...data.repository[entity].pageInfo
                }
              }
            }
          };
        }

        return {
          data: newStateData,
          status: STATUS.FINISHED_LOADING
        };
      });
    });
  };

  render() {
    const { status, error, data } = this.state;
    const { entity, repositoryOwner, repositoryName } = this.props;

    if (!data) {
      return <Loading />;
    }

    if (error) {
      return (
        <div className="flash flash-error">
          <button onClick={this.fetchIssues} className="btn btn-sm primary flash-action">
            Retry
          </button>
          {error}
        </div>
      );
    }

    const pageInfo = data.repository[entity].pageInfo;
    const issues = map(data.repository[entity].edges, "node");

    if (!issues.length) {
      return (
        <div className="Issues">
          <p>No content yet.</p>
        </div>
      );
    }

    return (
      <div className="Issues">
        <ol className="IssueList">
          {issues.map(issue => (
            <li className="Issue" key={issue.id}>
              <IssueItem {...issue} />
            </li>
          ))}
        </ol>

        {status === STATUS.LOADING && <Loading />}

        <FetchMore
          loading={status === STATUS.LOADING}
          hasNextPage={pageInfo.hasNextPage}
          variables={{
            entity,
            repositoryOwner,
            repositoryName,
            cursor: pageInfo.endCursor
          }}
          fetchMore={this.fetchIssues}
        />
      </div>
    );
  }
}

export default Issues;
