import { get, queries } from "../githubApi";

export const REQUEST_RELEASES = "REQUEST_RELEASES";
export const REQUEST_RELEASES_LOADING = "REQUEST_RELEASES_LOADING";
export const REQUEST_RELEASES_SUCCESS = "REQUEST_RELEASES_SUCCESS";
export const REQUEST_RELEASES_FAILURE = "REQUEST_RELEASES_FAILURE";

export const requestReleases = (repoIds, token) => async dispatch => {
  try {
    dispatch(requestReleasesLoading());
    const query = queries.releasesForRepos(repoIds);
    const data = await get(query, token);
    dispatch(requestReleasesSuccess(data));
  } catch (err) {
    dispatch(requestReleasesFailure(err));
  }
};

export const requestReleasesLoading = () => ({
  type: REQUEST_RELEASES_LOADING
});

export const requestReleasesSuccess = data => ({
  type: REQUEST_RELEASES_SUCCESS,
  data
});

export const requestReleasesFailure = error => ({
  type: REQUEST_RELEASES_FAILURE,
  error
});
