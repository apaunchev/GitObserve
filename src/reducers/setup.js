import {
  REQUEST_GITHUB_TOKEN_LOADING,
  REQUEST_GITHUB_TOKEN_SUCCESS,
  REQUEST_GITHUB_TOKEN_FAILURE
} from "../actions/setup";

const initialState = {
  githubToken: null,
  githubTokenLoading: false,
  githubTokenError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GITHUB_TOKEN_LOADING:
      return {
        ...state,
        githubTokenLoading: true,
        githubTokenError: null
      };
    case REQUEST_GITHUB_TOKEN_SUCCESS:
      return {
        ...state,
        githubToken: action.token,
        githubTokenLoading: false,
        githubTokenError: null
      };
    case REQUEST_GITHUB_TOKEN_FAILURE:
      return {
        ...state,
        githubTokenLoading: false,
        githubTokenError: action.error
      };
    default:
      return state;
  }
}
