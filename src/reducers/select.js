import * as actions from "../actions/select";

const initialState = {
  watchedRepos: [],
  selectedRepos: [],
  loading: false,
  githubError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.REQUEST_WATCHED_REPOS_LOADING:
      return {
        ...state,
        loading: true,
        githubError: null
      };
    case actions.REQUEST_WATCHED_REPOS_SUCCESS:
      return {
        ...state,
        watchedRepos: action.data,
        githubError: null,
        loading: false
      };
    case actions.REQUEST_WATCHED_REPOS_FAILURE:
      return {
        ...state,
        githubError: action.error,
        loading: false
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
    case actions.RESET_SELECTED_REPOS:
      return {
        ...state,
        selectedRepos: []
      };
    default:
      return state;
  }
}
