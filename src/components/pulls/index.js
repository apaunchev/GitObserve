import Octicon, {
  Settings as SettingsIcon,
  Sync as SyncIcon
} from "@githubprimer/octicons-react";
import { differenceInDays, fromUnixTime, format } from "date-fns";
import { extend, filter, orderBy } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/pulls";
import Blankslate from "../common/blankslate";
import Flash from "../common/flash";
import Filters from "./filters";
import PullRequest from "./pull-request";
import SubNav from "./subnav";

class PullRequests extends React.PureComponent {
  componentDidMount() {
    if (!this.props.token) {
      this.props.resetPullRequests();
    }

    if (this.props.token && this.props.selectedRepos.length) {
      if (((this.props.location || {}).state || {}).refresh) {
        this.props.requestPullRequests(
          this.props.selectedRepos,
          this.props.token
        );
      }
    }
  }

  render() {
    const {
      selectedRepos,
      filteredPullRequests,
      loading,
      githubError,
      requestPullRequests,
      token,
      lastUpdated
    } = this.props;

    return (
      <>
        <div className="App-menu p-3 bg-gray-light border-bottom">
          <div className="container-lg d-flex flex-items-center">
            <div className="flex-auto">
              <h1 className="h3">Pull requests</h1>
            </div>
            <div>
              <Link to="/settings" className="btn mr-2">
                <Octicon icon={SettingsIcon} /> Settings
              </Link>
            </div>
          </div>
        </div>
        <main className="App-main">
          <div className="container-lg py-4">
            {!selectedRepos.length ? (
              <Flash>
                You have not selected any{" "}
                <Link to="/settings/repositories">repositories</Link> yet.
              </Flash>
            ) : (
              <>
                <SubNav />
                <div className="Box">
                  <div className="Box-header d-flex flex-items-center">
                    <div className="flex-auto d-flex flex-items-center">
                      <Filters pullRequests={filteredPullRequests} />
                    </div>
                    <div className="d-flex flex-items-center">
                      <button
                        className="btn btn-sm btn-primary tooltipped tooltipped-sw"
                        aria-label={`Last updated: ${
                          lastUpdated
                            ? `${format(fromUnixTime(lastUpdated), "Pp")}`
                            : "never"
                        }.`}
                        onClick={() =>
                          requestPullRequests(selectedRepos, token)
                        }
                        disabled={loading}
                      >
                        <Octicon icon={SyncIcon} />{" "}
                        {loading ? "Loading..." : "Refresh"}
                      </button>
                    </div>
                  </div>

                  {githubError ? (
                    <Blankslate>
                      <p>
                        Error fetching data from GitHub. Ensure your{" "}
                        <Link to="/settings/account">token</Link> is set
                        correctly and try again.
                      </p>
                    </Blankslate>
                  ) : null}

                  {!githubError && !filteredPullRequests.length ? (
                    <Blankslate>
                      <p>No pull requests were found.</p>
                    </Blankslate>
                  ) : null}

                  {!githubError && filteredPullRequests.length > 0
                    ? filteredPullRequests.map(pr => (
                        <PullRequest key={pr.id} {...pr} />
                      ))
                    : null}
                </div>
              </>
            )}
          </div>
        </main>
      </>
    );
  }
}

PullRequests.propTypes = {
  selectedRepos: PropTypes.arrayOf(PropTypes.string),
  githubError: PropTypes.shape(),
  loading: PropTypes.bool,
  pullRequests: PropTypes.arrayOf(PropTypes.shape()),
  token: PropTypes.string,
  requestPullRequests: PropTypes.func
};

PullRequests.defaultProps = {
  selectedRepos: [],
  token: null,
  pullRequests: [],
  loading: false,
  githubError: null
};

const applyFilters = (pullRequests, filters) => {
  let filtered = pullRequests;

  if (filters.hideOldEnabled) {
    filtered = filter(filtered, pr => {
      return (
        differenceInDays(new Date(pr[filters.orderBy]), new Date()) >
        -filters.hideOldThreshold
      );
    });
  }

  if (filters.repo) {
    filtered = filter(filtered, pr => pr.repoName === filters.repo);
  }

  if (filters.author) {
    filtered = filter(filtered, pr => pr.author.login === filters.author);
  }

  if (filters.reviewState) {
    filtered = filter(filtered, pr => pr.reviewState === filters.reviewState);
  }

  if (filters.hideWithoutRequestEnabled) {
    filtered = filter(filtered, pr => pr.reviewState !== "no request");
  }

  if (filters.searchQuery) {
    filtered = filter(filtered, pr => {
      const searchQuery = filters.searchQuery.toLowerCase();
      const repoName = pr.repoName.toLowerCase();
      const title = pr.title.toLowerCase();
      const authorLogin = pr.author.login.toLowerCase();

      return (
        repoName.indexOf(searchQuery) > -1 ||
        title.indexOf(searchQuery) > -1 ||
        authorLogin.indexOf(searchQuery) > -1
      );
    });
  }

  filtered = orderBy(filtered, filters.orderBy, "desc");

  return filtered;
};

const mapStateToProps = state => ({
  selectedRepos: state.settings.selectedRepos,
  token: state.settings.token,
  githubError: state.pulls.githubError,
  loading: state.pulls.loading,
  lastUpdated: state.pulls.lastUpdated,
  filteredPullRequests: applyFilters(
    state.pulls.pulls,
    extend(
      {
        hideOldEnabled: state.settings.hideOldEnabled,
        hideOldThreshold: state.settings.hideOldThreshold,
        hideWithoutRequestEnabled: state.settings.hideWithoutRequestEnabled
      },
      state.pulls.filters
    )
  )
});

const mapDispatchToProps = dispatch => ({
  requestPullRequests: (repoIds, token) =>
    dispatch(actions.requestPullRequests(repoIds, token)),
  resetPullRequests: () => dispatch(actions.resetPullRequests()),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PullRequests);
