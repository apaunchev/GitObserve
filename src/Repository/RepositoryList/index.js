import React from "react";

import RepositoryItem from "../RepositoryItem";
import Issues from "../../Issue/IssueList";
import FetchMore from "../../FetchMore";

import "./style.css";

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      watching: {
        ...previousResult.viewer.watching,
        ...fetchMoreResult.viewer.watching,
        edges: [
          ...previousResult.viewer.watching.edges,
          ...fetchMoreResult.viewer.watching.edges
        ]
      }
    }
  };
};

const RepositoryList = ({ loading, repositories, fetchMore }) => (
  <>
    <ol className="RepositoryList">
      {repositories.edges.map(({ node }) => (
        <li key={node.id} className="RepositoryItem">
          <RepositoryItem {...node} />
          <details>
            <summary>Issues ({node.issues.totalCount})</summary>
            <Issues
              entry={"issues"}
              repositoryName={node.name}
              repositoryOwner={node.owner.login}
            />
          </details>
          <details>
            <summary>Pull Requests ({node.pullRequests.totalCount})</summary>
            <Issues
              entry={"pullRequests"}
              repositoryName={node.name}
              repositoryOwner={node.owner.login}
            />
          </details>
        </li>
      ))}
    </ol>
    <FetchMore
      loading={loading}
      hasNextPage={repositories.pageInfo.hasNextPage}
      variables={{
        cursor: repositories.pageInfo.endCursor
      }}
      updateQuery={updateQuery}
      fetchMore={fetchMore}
    />
  </>
);

export default RepositoryList;
