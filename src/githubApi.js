export const queries = {
  currentUser: () => `
    query {
      viewer {
        login
        avatarUrl
        url
      }
    }
  `
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
      console.error(result.errors);
      if (result.errors[0].type === "MAX_NODE_LIMIT_EXCEEDED") {
        throw new Error(
          `The amount of pull request data for your selected repositories exceeds Github's maximum limit. Try selecting fewer repositories and trying again. Here is the specific error from Github as guidance: ${
            result.errors[0].message
          }`
        );
      }
      throw new Error(result.errors[0].message);
    }

    if (result.data) {
      return result.data;
    }
  }

  throw new Error("Error communicating with Github");
};
