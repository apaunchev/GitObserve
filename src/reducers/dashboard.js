import _ from "lodash";
import * as actions from "../actions/dashboard";

const initialState = {
  pullRequests: [],
  loading: false,
  githubError: null
};

const formatPrs = prs => {
  return _.chain(prs.nodes)
    .filter(node => node)
    .map(node => _.map(node.pullRequests.edges, "node"))
    .flatten()
    .map(pr => ({
      ...pr,
      repoName: pr.repository.nameWithOwner
    }))
    .orderBy("updatedAt")
    .reverse()
    .value();
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.REQUEST_PULL_REQUESTS_LOADING:
      return {
        ...state,
        loading: true,
        githubError: null
      };
    case actions.REQUEST_PULL_REQUESTS_SUCCESS:
      return {
        ...state,
        pullRequests: formatPrs(action.data),
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
