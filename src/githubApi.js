const GITHUB_API_URI = "https://api.github.com/graphql";

export const get = async (query, token) => {
  const response = await fetch(GITHUB_API_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query })
  });

  if (response.ok) {
    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    if (result.data) {
      return result.data;
    }
  }

  throw new Error("Error communicating with GitHub");
};

export const queries = {
  viewerInfo: () => `
    {
      viewer {
        login
        avatarUrl(size: 96)
      }
    }
  `,
  watchedRepos: (cursor = "") => {
    const afterParam = cursor ? `after: ${cursor}` : "";
    return `
      query {
        viewer {
          watching(
            first: 100
            ${afterParam}
          ) {
            edges {
              cursor
              node {
                id
                name
                url
                owner {
                  login
                  avatarUrl(size: 96)
                }
                createdAt
              }
            }
            totalCount
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    `;
  },
  pullRequestsForRepos: repoIds => `
    query {
      nodes (ids: ${JSON.stringify(repoIds)}) {
        id
        ... on Repository {
          pullRequests(
            last: 50
            states: [OPEN]
          ) {
            edges {
              node {
                id
                number
                title
                url
                createdAt
                updatedAt
                repository {
                  nameWithOwner
                  url
                }
                author {
                  avatarUrl(size: 96)
                  login
                  url
                }
                reviewRequests(last: 50) {
                  edges {
                    node {
                      requestedReviewer {
                        ... on User {
                          login
                          avatarUrl(size: 96)
                        }
                        ... on Team {
                          name
                          avatarUrl(size: 96)
                        }
                      }
                    }
                  }
                }
                reviews(last: 50) {
                  edges {
                    node {
                      createdAt
                      state
                      author {
                        login
                        avatarUrl(size: 96)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
  releasesForRepos: repoIds => `
    query {
      nodes (ids: ${JSON.stringify(repoIds)}) {
        id
        ... on Repository {
          name
          url
          releases(last: 5) {
            edges {
              node {
                id
                name
                publishedAt
                description
                url
                author {
                  login
                  avatarUrl(size: 96)
                  url
                }
              }
            }
          }
        }
      }
    }
  `
};
