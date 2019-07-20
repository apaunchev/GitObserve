import { chain, map } from "lodash";
import * as actions from "../actions/releases";

const initialState = {
  releases: [],
  lastUpdated: null,
  loading: false,
  githubError: false
};

const formatReleases = data =>
  chain(data.nodes)
    .map(node => {
      const { name: repoName, url: repoUrl } = node;
      return {
        ...node,
        releases: map(node.releases.edges, ({ node }) => ({
          ...node,
          repoName,
          repoUrl
        }))
      };
    })
    .map(node => node.releases)
    .flatten()
    .orderBy("publishedAt")
    .reverse()
    .value();

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.REQUEST_RELEASES_LOADING:
      return {
        ...state,
        loading: true,
        githubError: false
      };
    case actions.REQUEST_RELEASES_SUCCESS:
      return {
        ...state,
        releases: formatReleases(action.data),
        lastUpdated: Math.floor(Date.now() / 1000),
        loading: false,
        githubError: false
      };
    case actions.REQUEST_RELEASES_FAILURE:
      return {
        ...state,
        releases: [],
        loading: false,
        githubError: action.error
      };
    default:
      return state;
  }
}
