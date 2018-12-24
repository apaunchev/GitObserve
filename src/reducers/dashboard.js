import {
  REQUEST_PULL_REQUESTS_LOADING,
  REQUEST_PULL_REQUESTS_SUCCESS,
  REQUEST_PULL_REQUESTS_FAILURE
} from "../actions/dashboard";

const initialState = {
  repositories: [],
  loading: false,
  githubError: null
};

let repositories;

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PULL_REQUESTS_LOADING:
      return {
        ...state,
        loading: true,
        githubError: null
      };
    case REQUEST_PULL_REQUESTS_SUCCESS:
      repositories = action.data.nodes
        .filter(node => node)
        .map(node => {
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
        repositories,
        loading: false,
        githubError: null
      };
    case REQUEST_PULL_REQUESTS_FAILURE:
      return {
        ...state,
        githubError: action.error,
        loading: false
      };
    default:
      return state;
  }
}
