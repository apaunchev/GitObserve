import { get, queries } from "../githubApi";

export const SET_TOKEN = "SET_TOKEN";
export const TOGGLE_REPO_SELECTION = "TOGGLE_REPO_SELECTION";
export const SELECT_ALL_REPOS = "SELECT_ALL_REPOS";
export const RESET_SELECTED_REPOS = "RESET_SELECTED_REPOS";
export const TOGGLE_AUTO_REFRESH = "TOGGLE_AUTO_REFRESH";
export const SET_AUTO_REFRESH_INTERVAL = "SET_AUTO_REFRESH_INTERVAL";
export const TOGGLE_HIDE_OLD = "TOGGLE_HIDE_OLD";
export const SET_HIDE_OLD_THRESHOLD = "SET_HIDE_OLD_THRESHOLD";
export const REQUEST_VIEWER_INFO = "REQUEST_VIEWER_INFO";
export const REQUEST_VIEWER_INFO_LOADING = "REQUEST_VIEWER_INFO_LOADING";
export const REQUEST_VIEWER_INFO_SUCCESS = "REQUEST_VIEWER_INFO_SUCCESS";
export const REQUEST_VIEWER_INFO_FAILURE = "REQUEST_VIEWER_INFO_FAILURE";
export const RESET_VIEWER_INFO = "RESET_VIEWER_INFO";

export const setToken = value => ({
  type: SET_TOKEN,
  value
});

export const toggleRepoSelection = id => ({
  type: TOGGLE_REPO_SELECTION,
  id
});

export const selectAllRepos = repoIds => ({
  type: SELECT_ALL_REPOS,
  repoIds
});

export const resetSelectedRepos = () => ({
  type: RESET_SELECTED_REPOS
});

export const toggleAutoRefresh = () => ({
  type: TOGGLE_AUTO_REFRESH
});

export const setAutoRefreshInterval = interval => ({
  type: SET_AUTO_REFRESH_INTERVAL,
  interval
});

export const toggleHideOld = () => ({
  type: TOGGLE_HIDE_OLD
});

export const setHideOldThreshold = threshold => ({
  type: SET_HIDE_OLD_THRESHOLD,
  threshold
});

export const requestViewerInfoLoading = () => ({
  type: REQUEST_VIEWER_INFO_LOADING
});

export const requestViewerInfoSuccess = viewerInfo => ({
  type: REQUEST_VIEWER_INFO_SUCCESS,
  viewerInfo
});

export const requestViewerInfoFailure = error => ({
  type: REQUEST_VIEWER_INFO_FAILURE,
  error
});

export const requestViewerInfo = token => async dispatch => {
  try {
    dispatch(requestViewerInfoLoading());
    const query = queries.viewerInfo();
    const viewerInfo = await get(query, token);
    dispatch(requestViewerInfoSuccess(viewerInfo.viewer));
  } catch (err) {
    dispatch(requestViewerInfoFailure(err));
  }
};

export const resetViewerInfo = () => ({
  type: RESET_VIEWER_INFO
});
