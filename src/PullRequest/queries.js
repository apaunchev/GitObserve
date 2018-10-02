export function getRepositoryPullRequests(owner, name, pullRequestState = "OPEN", cursor = null) {
  return `
    query {
      repository(owner: "${owner}", name: "${name}") {
        pullRequests(
          first: 5
          states: [${pullRequestState}]
          orderBy: { field: CREATED_AT, direction: DESC }
          after: ${cursor}
        ) {
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
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;
}
