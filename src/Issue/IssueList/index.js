import React from "react";
import { Query } from "react-apollo";

import IssueItem from "../IssueItem";
import FetchMore from "../../FetchMore";
import ErrorMessage from "../../Error";
import Loading from "../../Loading";

import {
  GET_ISSUES_OF_REPOSITORY,
  GET_PULL_REQUESTS_OF_REPOSITORY
} from "./queries";

import "./style.css";

const getUpdateQuery = entry => (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    repository: {
      ...previousResult.repository,
      [entry]: {
        ...previousResult.repository[entry],
        ...fetchMoreResult.repository[entry],
        edges: [
          ...previousResult.repository[entry].edges,
          ...fetchMoreResult.repository[entry].edges
        ]
      }
    }
  };
};

const Issues = ({ repositoryOwner, repositoryName, entry }) => (
  <div className="Issues">
    <Query
      query={
        entry === "issues"
          ? GET_ISSUES_OF_REPOSITORY
          : GET_PULL_REQUESTS_OF_REPOSITORY
      }
      variables={{
        repositoryOwner,
        repositoryName
      }}
      notifyOnNetworkStatusChange={true}
    >
      {({ data, loading, error, fetchMore }) => {
        if (error) {
          return <ErrorMessage error={error} />;
        }

        const { repository } = data;

        if (loading && !repository) {
          return <Loading />;
        }

        if (!repository[entry].edges.length) {
          return <div className="IssueList">No issues found.</div>;
        }

        return (
          <IssueList
            issues={repository[entry]}
            loading={loading}
            repositoryOwner={repositoryOwner}
            repositoryName={repositoryName}
            fetchMore={fetchMore}
            entry={entry}
          />
        );
      }}
    </Query>
  </div>
);

const IssueList = ({
  issues,
  loading,
  repositoryOwner,
  repositoryName,
  fetchMore,
  entry
}) => (
  <>
    <ol className="IssueList">
      {issues.edges.map(({ node }) => (
        <IssueItem
          key={node.id}
          issue={node}
          repositoryOwner={repositoryOwner}
          repositoryName={repositoryName}
        />
      ))}
    </ol>

    <FetchMore
      loading={loading}
      hasNextPage={issues.pageInfo.hasNextPage}
      variables={{
        cursor: issues.pageInfo.endCursor,
        repositoryOwner,
        repositoryName
      }}
      updateQuery={getUpdateQuery(entry)}
      fetchMore={fetchMore}
    />
  </>
);

export default Issues;
