export const GET_VIEWER = `
  query {
    viewer {
      login
      url
    }
  }
`;

export function getWatchedRepositories(after = "") {
  return `
    query {
      viewer {
        watching(first: 10, after: "${after}", orderBy: { field: PUSHED_AT, direction: DESC }) {
          totalCount
          edges {
            node {
              id
              nameWithOwner
              pushedAt
              url
              descriptionHTML
              issues(first: 10, states: [OPEN], orderBy: { field: CREATED_AT, direction: DESC }) {
                totalCount
                edges {
                  node {
                    id
                    title
                    createdAt
                    url
                    author {
                      login
                      url
                    }
                  }
                }
              }
              pullRequests(first: 10, states: [OPEN], orderBy: { field: CREATED_AT, direction: DESC }) {
                totalCount
                edges {
                  node {
                    id
                    title
                    createdAt
                    url
                    author {
                      login
                      url
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
  `;
}
