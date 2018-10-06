export function getRepositoryIssues({
  entity = "issues",
  repositoryOwner,
  repositoryName,
  issueState = "OPEN",
  cursor = null
}) {
  return `
    query {
      repository(owner: "${repositoryOwner}", name: "${repositoryName}") {
        ${entity}(
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
