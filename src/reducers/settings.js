import * as actions from "../actions/settings";

const initialState = {
  token: "",
  selectedRepos: [],
  autoRefreshEnabled: false,
  autoRefreshInterval: "5",
  stalenessLabelsEnabled: true
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
    case actions.TOGGLE_STALENESS_LABELS:
      return {
        ...state,
        stalenessLabelsEnabled: !state.stalenessLabelsEnabled
      };
    default:
      return state;
  }
}
