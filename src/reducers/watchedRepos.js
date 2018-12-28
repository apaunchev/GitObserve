import * as actions from "../actions/watchedRepos";

const initialState = {
  repos: [],
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
        repos: action.data,
        githubError: null,
        loading: false
      };
    case actions.REQUEST_WATCHED_REPOS_FAILURE:
      return {
        ...state,
        repos: [],
        githubError: action.error,
        loading: false
      };
    default:
      return state;
  }
}
