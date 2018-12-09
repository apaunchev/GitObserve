export const queries = {
  currentUser: () => `
    query {
      viewer {
        login
        avatarUrl
        url
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
            affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
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
                  avatarUrl
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
  }
};

export const get = async (query, token) => {
  const response = await fetch(process.env.REACT_APP_GITHUB_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`
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
