import gql from "graphql-tag";

export const GET_WATCHING_REPOSITORIES = gql`
  query($cursor: String) {
    viewer {
      watching(
        first: 10
        after: $cursor
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        edges {
          node {
            id
            name
            pushedAt
            url
            descriptionHTML
            owner {
              login
              url
            }
            issues(states: [OPEN]) {
              totalCount
            }
            pullRequests(states: [OPEN]) {
              totalCount
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
