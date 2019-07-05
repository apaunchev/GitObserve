import * as actions from "../actions/settings";

const initialState = {
  token: "",
  selectedRepos: [],
  autoRefreshEnabled: false,
  autoRefreshInterval: "5",
  hideOldEnabled: false,
  hideOldThreshold: 30,
  hideWithoutRequest: false,
  viewerInfo: {},
  loading: false,
  githubError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.SET_TOKEN:
      return {
        ...state,
        token: action.value
      };
    case actions.TOGGLE_REPO_SELECTION:
      return state.selectedRepos.includes(action.id)
        ? {
            ...state,
            selectedRepos: state.selectedRepos.filter(
              repoId => repoId !== action.id
            )
          }
        : {
            ...state,
            selectedRepos: [...state.selectedRepos, action.id]
          };
    case actions.SELECT_ALL_REPOS:
      return {
        ...state,
        selectedRepos: [...action.repoIds]
      };
    case actions.RESET_SELECTED_REPOS:
      return {
        ...state,
        selectedRepos: []
      };
    case actions.TOGGLE_AUTO_REFRESH:
      return {
        ...state,
        autoRefreshEnabled: !state.autoRefreshEnabled
      };
    case actions.SET_AUTO_REFRESH_INTERVAL:
      return {
        ...state,
        autoRefreshInterval: action.interval
      };
    case actions.TOGGLE_HIDE_OLD:
      return {
        ...state,
        hideOldEnabled: !state.hideOldEnabled
      };
    case actions.SET_HIDE_OLD_THRESHOLD:
      return {
        ...state,
        hideOldThreshold: action.threshold
      };
    case actions.TOGGLE_HIDE_WITHOUT_REQUEST:
      return {
        ...state,
        hideWithoutRequestEnabled: !state.hideWithoutRequestEnabled
      };
    case actions.REQUEST_VIEWER_INFO_LOADING:
      return {
        ...state,
        loading: true,
        githubError: null
      };
    case actions.REQUEST_VIEWER_INFO_SUCCESS:
      return {
        ...state,
        viewerInfo: action.viewerInfo,
        loading: false,
        githubError: null
      };
    case actions.REQUEST_VIEWER_INFO_FAILURE:
      return {
        ...state,
        viewerInfo: {},
        githubError: action.error,
        loading: false
      };
    case actions.RESET_VIEWER_INFO:
      return {
        ...state,
        viewerInfo: {}
      };
    default:
      return state;
  }
}
