export const SET_TOKEN = "SET_TOKEN";
export const TOGGLE_REPO_SELECTION = "TOGGLE_REPO_SELECTION";
export const SELECT_ALL_REPOS = "SELECT_ALL_REPOS";
export const RESET_SELECTED_REPOS = "RESET_SELECTED_REPOS";
export const TOGGLE_AUTO_REFRESH = "TOGGLE_AUTO_REFRESH";
export const SET_AUTO_REFRESH_INTERVAL = "SET_AUTO_REFRESH_INTERVAL";

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
