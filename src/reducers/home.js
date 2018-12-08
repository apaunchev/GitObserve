import {
  REQUEST_CURRENT_USER_LOADING,
  REQUEST_CURRENT_USER_SUCCESS,
  REQUEST_CURRENT_USER_FAILURE
} from "../actions/home";

const initialState = {
  currentUser: null,
  currentUserLoading: false,
  currentUserError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CURRENT_USER_LOADING:
      return {
        ...state,
        currentUserLoading: true
      };
    case REQUEST_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: {
          login: action.data.viewer.login,
          avatarUrl: action.data.viewer.avatarUrl,
          url: action.data.viewer.url
        },
        currentUserError: null,
        currentUserLoading: false
      };
    case REQUEST_CURRENT_USER_FAILURE:
      return {
        ...state,
        currentUserError: action.error,
        currentUserLoading: false
      };
    default:
      return state;
  }
}
