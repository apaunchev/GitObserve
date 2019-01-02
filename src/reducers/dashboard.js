import _ from "lodash";
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
      pullRequests = _.chain(action.data.nodes)
        .filter(node => node)
        .map(node => _.map(node.pullRequests.edges, "node"))
        .flatten()
        .map(pr => ({
          ...pr,
          repoName: pr.repository.nameWithOwner
        }))
        .value();

      return {
        ...state,
        pullRequests,
        loading: false,
        githubError: null
      };
    case actions.REQUEST_PULL_REQUESTS_FAILURE:
      return {
        ...state,
        pullRequests: [],
        githubError: action.error,
        loading: false
      };
    default:
      return state;
  }
}
