export const REQUEST_GITHUB_TOKEN = "REQUEST_GITHUB_TOKEN";
export const REQUEST_GITHUB_TOKEN_LOADING = "REQUEST_GITHUB_TOKEN_LOADING";
export const REQUEST_GITHUB_TOKEN_SUCCESS = "REQUEST_GITHUB_TOKEN_SUCCESS";
export const REQUEST_GITHUB_TOKEN_FAILURE = "REQUEST_GITHUB_TOKEN_FAILURE";

export const requestGithubTokenLoading = () => ({
  type: REQUEST_GITHUB_TOKEN_LOADING
});

export const requestGithubTokenSuccess = token => ({
  type: REQUEST_GITHUB_TOKEN_SUCCESS,
  token
});

export const requestGithubTokenFailure = error => ({
  type: REQUEST_GITHUB_TOKEN_FAILURE,
  error
});

const gatekeeperUrl = process.env.REACT_APP_AUTH_API_URI;

export const requestGithubToken = code => async dispatch => {
  dispatch(requestGithubTokenLoading());
  try {
    const response = await fetch(`${gatekeeperUrl}/${code}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "GET"
    });
    const result = await response.json();
    dispatch(requestGithubTokenSuccess(result.token));
  } catch (error) {
    dispatch(requestGithubTokenFailure(error));
  }
};
