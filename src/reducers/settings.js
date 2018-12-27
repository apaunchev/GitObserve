import * as actions from "../actions/settings";

const initialState = {
  selectedRepos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
