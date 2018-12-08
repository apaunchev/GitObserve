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

export const requestCurrentUser = token => async dispatch => {
  try {
    dispatch(requestCurrentUserLoading());
    const query = queries.currentUser();
    const results = await get(query, token);
    dispatch(requestCurrentUserSuccess(results));
  } catch (err) {
    dispatch(requestCurrentUserFailure(err));
  }
};
