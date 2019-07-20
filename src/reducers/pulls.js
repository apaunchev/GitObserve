import { chain, map } from "lodash";
import * as actions from "../actions/pulls";

const initialState = {
  pulls: [],
  lastUpdated: null,
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
  // Expected values from GitHub:
  // "PENDING", "COMMENTED", "APPROVED", "CHANGES_REQUESTED", "DISMISSED".
  // Additional (custom) values:
  // "REVIEW_REQUESTED", "NO_REQUEST".
  // Take the state from the last review, replace any underscores,
  // and make it lowercase so it can be dispayed nicely to the user.
  let state = null;
  if (!reviews.length) {
    if (reviewRequests.length > 0) {
      state = "REVIEW_REQUESTED";
    } else {
      state = "NO_REQUEST";
    }
    return formatReviewState(state);
  }
  state = reviews[reviews.length - 1].state;
  return formatReviewState(state);
};

const formatPrs = (newPrs, oldPrs) => {
  const oldPrsById = map(oldPrs, "id");

  return chain(newPrs.nodes)
    .filter(node => node)
    .map(node => map(node.pullRequests.edges, "node"))
    .flatten()
    .map(pr => {
      const reviews = map(pr.reviews.edges, "node");
      const reviewRequests = map(pr.reviewRequests.edges, "node");
      return {
        ...pr,
        reviews,
        reviewRequests,
        repoName: pr.repository.nameWithOwner,
        reviewCount: reviews.length,
        reviewState: getReviewState(reviews, reviewRequests),
        reviewedAt: reviews.length
          ? reviews[reviews.length - 1].createdAt
          : null,
        assignees: map(pr.assignees.edges, "node"),
        isNew: !oldPrsById.includes(pr.id)
      };
    })
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
        pulls: formatPrs(action.newPrs, action.oldPrs),
        lastUpdated: Math.floor(Date.now() / 1000),
        loading: false,
        githubError: null
      };
    case actions.REQUEST_PULL_REQUESTS_FAILURE:
      return {
        ...state,
        pulls: [],
        githubError: action.error,
        loading: false
      };
    case actions.RESET_PULL_REQUESTS:
      return {
        ...state,
        pulls: [],
        githubError: null,
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
