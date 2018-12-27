import * as actions from "../actions/dashboard";

const initialState = {
  pullRequests: [],
  loading: false,
  githubError: null
};

let pullRequests;

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.REQUEST_PULL_REQUESTS_LOADING:
      return {
        ...state,
        loading: true,
        githubError: null
      };
    case actions.REQUEST_PULL_REQUESTS_SUCCESS:
      pullRequests = action.data.nodes
        .filter(node => node)
        .map(node => node.pullRequests.edges.map(edge => edge.node));
      pullRequests = [].concat(...pullRequests);

      return {
        ...state,
        pullRequests,
        loading: false,
        githubError: null
      };
    case actions.REQUEST_PULL_REQUESTS_FAILURE:
      return {
        ...state,
        githubError: action.error,
        loading: false
      };
    default:
      return state;
  }
}
