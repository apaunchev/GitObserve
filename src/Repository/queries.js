export function getWatchedRepositories(cursor = null) {
  return `
    query {
      viewer {
        watching(first: 10, after: "${cursor}", orderBy: { field: PUSHED_AT, direction: DESC }) {
          edges {
            node {
              id
              name
              owner {
                login
                url
              }
              pushedAt
              url
              descriptionHTML
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
}
