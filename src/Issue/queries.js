export function getRepositoryIssues(owner, name, issueState = "OPEN", cursor = null) {
  return `
    query {
      repository(owner: "${owner}", name: "${name}") {
        issues(
          first: 5
          states: [${issueState}]
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
