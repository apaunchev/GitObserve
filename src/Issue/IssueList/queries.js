import gql from "graphql-tag";

export const GET_ISSUES_OF_REPOSITORY = gql`
  query($repositoryOwner: String!, $repositoryName: String!, $cursor: String) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(
        first: 5
        states: [OPEN]
        after: $cursor
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        edges {
          node {
            id
            title
            url
            bodyHTML
            author {
              login
              url
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_PULL_REQUESTS_OF_REPOSITORY = gql`
  query($repositoryOwner: String!, $repositoryName: String!, $cursor: String) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      pullRequests(
        first: 5
        states: [OPEN]
        after: $cursor
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        edges {
          node {
            id
            title
            url
            bodyHTML
            author {
              login
              url
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
