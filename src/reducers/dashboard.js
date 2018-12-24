import {
  REQUEST_CURRENT_USER_LOADING,
  REQUEST_CURRENT_USER_SUCCESS,
  REQUEST_CURRENT_USER_FAILURE,
  REQUEST_PULL_REQUESTS_LOADING,
  REQUEST_PULL_REQUESTS_SUCCESS,
  REQUEST_PULL_REQUESTS_FAILURE
} from "../actions/dashboard";

const initialState = {
  currentUser: null,
  currentUserLoading: false,
  currentUserError: null,
  repositories: [],
  pullRequestsLoading: false,
  pullRequestsError: null
};

let filteredNodes;
let repos;

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
    case REQUEST_PULL_REQUESTS_LOADING:
      return {
        ...state,
        pullRequestsLoading: true,
        pullRequestsError: null
      };
    case REQUEST_PULL_REQUESTS_SUCCESS:
      filteredNodes = action.data.nodes.filter(node => node);
      repos = filteredNodes.map(node => {
        const extendedRepoData = action.watchedRepos.find(
          watchedRepo => watchedRepo.id === node.id
        );

        return {
          ...node,
          name: extendedRepoData.name,
          url: extendedRepoData.url,
          owner: extendedRepoData.owner
        };
      });

      return {
        ...state,
        repositories: repos,
        pullRequestsLoading: false,
        pullRequestsError: null
      };
    case REQUEST_PULL_REQUESTS_FAILURE:
      return {
        ...state,
        pullRequestsError: action.error,
        pullRequestsLoading: false
      };
    default:
      return state;
  }
}
