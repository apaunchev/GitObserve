import _ from "lodash";
import * as actions from "../actions/dashboard";

const initialState = {
  pullRequests: [],
  filters: {
    repo: "",
    author: "",
    reviewState: "",
    orderBy: "updatedAt",
    searchQuery: ""
  },
  loading: false,
  githubError: null
};

const formatReviewState = state => {
  if (typeof state !== "string") return;
  return state.replace(/_/g, " ").toLowerCase();
};

const getReviewState = (reviews, reviewRequests) => {
  // Expected values: "PENDING", "COMMENTED", "APPROVED",
  // "CHANGES_REQUESTED", "DISMISSED", or "REVIEW_REQUESTED" (custom).
  // We take the last review's state, replace any underscores, and make it
  // lowercase so it can be dispayed nicely to the user.
  let state = null;
  if (!reviews.length) {
    if (reviewRequests.length > 0) {
      state = "REVIEW_REQUESTED";
    }
    return formatReviewState(state);
  }
  state = reviews[reviews.length - 1].state;
  return formatReviewState(state);
};

const formatPrs = (newPrs, oldPrs) => {
  const oldPrsById = _.map(oldPrs, "id");

  return _.chain(newPrs.nodes)
    .filter(node => node)
    .map(node => _.map(node.pullRequests.edges, "node"))
    .flatten()
    .map(pr => ({
      ...pr,
      repoName: pr.repository.nameWithOwner,
      reviewState: getReviewState(
        _.map(pr.reviews.edges, "node"),
        _.map(pr.reviewRequests.edges, "node")
      ),
      assignees: _.map(pr.assignees.edges, "node"),
      isNew: !oldPrsById.includes(pr.id)
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
        pullRequests: formatPrs(action.newPrs, action.oldPrs),
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
    case actions.SET_FILTERS:
      return {
        ...state,
        filters: action.filters
      };
    default:
      return state;
  }
}
