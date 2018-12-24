import { queries, get } from "../githubApi";

export const REQUEST_CURRENT_USER = "REQUEST_CURRENT_USER";
export const REQUEST_CURRENT_USER_LOADING = "REQUEST_CURRENT_USER_LOADING";
export const REQUEST_CURRENT_USER_SUCCESS = "REQUEST_CURRENT_USER_SUCCESS";
export const REQUEST_CURRENT_USER_FAILURE = "REQUEST_CURRENT_USER_FAILURE";

export const requestCurrentUserLoading = () => ({
  type: REQUEST_CURRENT_USER_LOADING
});

export const requestCurrentUserSuccess = data => ({
  type: REQUEST_CURRENT_USER_SUCCESS,
  data
});

export const requestCurrentUserFailure = error => ({
  type: REQUEST_CURRENT_USER_LOADING,
  error
});

export const requestCurrentUser = () => async dispatch => {
  try {
    dispatch(requestCurrentUserLoading());
    const query = queries.currentUser();
    const results = await get(query);
    dispatch(requestCurrentUserSuccess(results));
  } catch (err) {
    dispatch(requestCurrentUserFailure(err));
  }
};

export const REQUEST_PULL_REQUESTS = "REQUEST_PULL_REQUESTS";
export const REQUEST_PULL_REQUESTS_LOADING = "REQUEST_PULL_REQUESTS_LOADING";
export const REQUEST_PULL_REQUESTS_SUCCESS = "REQUEST_PULL_REQUESTS_SUCCESS";
export const REQUEST_PULL_REQUESTS_FAILURE = "REQUEST_PULL_REQUESTS_FAILURE";

export const requestPullRequestsLoading = () => ({
  type: REQUEST_PULL_REQUESTS_LOADING
});

export const requestPullRequestsSuccess = (data, watchedRepos) => ({
  type: REQUEST_PULL_REQUESTS_SUCCESS,
  data,
  watchedRepos
});

export const requestPullRequestsFailure = error => ({
  type: REQUEST_PULL_REQUESTS_FAILURE,
  error
});

export const requestPullRequests = repoIds => async (dispatch, getState) => {
  const watchedRepos = getState().settings.watchedRepos;
  try {
    dispatch(requestPullRequestsLoading());
    const query = queries.pullRequests(repoIds);
    const results = await get(query);
    dispatch(requestPullRequestsSuccess(results, watchedRepos));
  } catch (err) {
    dispatch(requestPullRequestsFailure(err));
  }
};
