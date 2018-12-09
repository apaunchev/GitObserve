import {
  REQUEST_GITHUB_TOKEN_LOADING,
  REQUEST_GITHUB_TOKEN_SUCCESS,
  REQUEST_GITHUB_TOKEN_FAILURE
} from "../actions/setup";

const initialState = {
  githubToken: null,
  loading: false,
  githubError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GITHUB_TOKEN_LOADING:
      return {
        ...state,
        loading: true,
        githubError: null
      };
    case REQUEST_GITHUB_TOKEN_SUCCESS:
      return {
        ...state,
        githubToken: action.token,
        loading: false,
        githubError: null
      };
    case REQUEST_GITHUB_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        githubError: action.error
      };
    default:
      return state;
  }
}
