import {
  REQUEST_CURRENT_USER_LOADING,
  REQUEST_CURRENT_USER_SUCCESS,
  REQUEST_CURRENT_USER_FAILURE
} from "../actions/home";

const initialState = {
  currentUser: null,
  loading: false,
  githubError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CURRENT_USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case REQUEST_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: {
          login: action.data.viewer.login,
          avatarUrl: action.data.viewer.avatarUrl,
          url: action.data.viewer.url
        },
        githubError: null,
        loading: false
      };
    case REQUEST_CURRENT_USER_FAILURE:
      return {
        ...state,
        githubError: action.error,
        loading: false
      };
    default:
      return state;
  }
}
