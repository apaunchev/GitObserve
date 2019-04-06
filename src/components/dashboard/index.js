import Octicon, {
  Settings as SettingsIcon,
  Sync as SyncIcon,
  Search as SearchIcon
} from "@githubprimer/octicons-react";
import _ from "lodash";
import { differenceInDays } from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/dashboard";
import Flash from "../common/flash";
import Filters from "./filters";
import PullRequest from "./pull-request";

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateInterval = null;
  }

  componentDidMount() {
    if (this.props.selectedRepos.length > 0) {
      if (this.props.autoRefreshEnabled) {
        this.updateInterval = setInterval(() => {
          this.props.requestPullRequests(
            this.props.selectedRepos,
            this.props.token
          );
        }, this.props.autoRefreshInterval * 60 * 1000);
      }
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.updateInterval);
  }

  handleReviewStateChange = e => {
    e.preventDefault();

    this.props.setFilters({
      ...this.props.filters,
      reviewState: e.target.dataset.reviewState
    });
  };

  render() {
    const {
      selectedRepos,
      pullRequests,
      filteredPullRequests,
      loading,
      githubError,
      requestPullRequests,
      token,
      autoRefreshEnabled,
      filters,
      setFilters
    } = this.props;

    return (
      <>
        <div className="App-menu p-3 bg-gray-light border-bottom">
          <div className="container-lg d-flex flex-items-center">
            <div className="flex-auto">
              <h1 className="h3">Dashboard</h1>
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
                <div className="subnav d-flex">
                  <nav className="subnav-links flex-auto">
                    <a
                      href="/"
                      data-review-state=""
                      onClick={this.handleReviewStateChange}
                      className={`subnav-item${
                        filters.reviewState === "" ? " selected" : ""
                      }`}
                    >
                      All
                    </a>
                    <a
                      href="/"
                      data-review-state="review requested"
                      onClick={this.handleReviewStateChange}
                      className={`subnav-item${
                        filters.reviewState === "review requested"
                          ? " selected"
                          : ""
                      }`}
                    >
                      Review requested
                    </a>
                    <a
                      href="/"
                      data-review-state="changes requested"
                      onClick={this.handleReviewStateChange}
                      className={`subnav-item${
                        filters.reviewState === "changes requested"
                          ? " selected"
                          : ""
                      }`}
                    >
                      Changes requested
                    </a>
                    <a
                      href="/"
                      data-review-state="commented"
                      onClick={this.handleReviewStateChange}
                      className={`subnav-item${
                        filters.reviewState === "commented" ? " selected" : ""
                      }`}
                    >
                      Commented
                    </a>
                    <a
                      href="/"
                      data-review-state="approved"
                      onClick={this.handleReviewStateChange}
                      className={`subnav-item${
                        filters.reviewState === "approved" ? " selected" : ""
                      }`}
                    >
                      Approved
                    </a>
                  </nav>
                  <div className="subnav-search col-3">
                    <input
                      type="search"
                      name="name"
                      className="form-control input-contrast"
                      style={{ width: "100%", paddingLeft: 28 }}
                      placeholder="Search pull requests..."
                      value={filters.searchQuery}
                      onChange={e =>
                        setFilters({
                          ...filters,
                          searchQuery: e.target.value
                        })
                      }
                    />
                    <Octicon icon={SearchIcon} className="subnav-search-icon" />
                  </div>
                </div>
                <div className="Box">
                  <div className="Box-header d-flex flex-items-center">
                    <div className="flex-auto d-flex flex-items-center">
                      <Filters
                        pullRequests={pullRequests}
                        filteredCount={filteredPullRequests.length}
                      />
                    </div>
                    <div className="d-flex flex-items-center">
                      {autoRefreshEnabled && (
                        <span className="text-gray mr-2 f6">
                          Auto refresh{" "}
                          <Link to={"/settings/dashboard"}>enabled</Link>.
                        </span>
                      )}
                      <button
                        className="btn btn-sm btn-primary"
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
                    <div className="blankslate blankslate-clean-background">
                      <p>
                        Error fetching data from GitHub. Ensure your{" "}
                        <Link to="/settings/account">token</Link> is set
                        correctly and try again.
                      </p>
                    </div>
                  ) : null}

                  {!loading && !githubError && !filteredPullRequests.length ? (
                    <div className="blankslate blankslate-clean-background">
                      <p>No pull requests were found.</p>
                    </div>
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

Dashboard.propTypes = {
  selectedRepos: PropTypes.arrayOf(PropTypes.string),
  githubError: PropTypes.shape(),
  loading: PropTypes.bool,
  pullRequests: PropTypes.arrayOf(PropTypes.shape()),
  token: PropTypes.string,
  requestPullRequests: PropTypes.func
};

Dashboard.defaultProps = {
  selectedRepos: [],
  token: null,
  pullRequests: [],
  loading: false,
  githubError: null
};

const applyFilters = (pullRequests, filters) => {
  let filtered = pullRequests;

  if (filters.hideOldEnabled) {
    filtered = _.filter(filtered, pr => {
      return (
        differenceInDays(new Date(pr[filters.orderBy]), new Date()) >
        -filters.hideOldThreshold
      );
    });
  }

  if (filters.repo) {
    filtered = _.filter(filtered, pr => pr.repoName === filters.repo);
  }

  if (filters.author) {
    filtered = _.filter(filtered, pr => pr.author.login === filters.author);
  }

  if (filters.reviewState) {
    filtered = _.filter(filtered, pr => pr.reviewState === filters.reviewState);
  }

  if (filters.searchQuery) {
    filtered = _.filter(filtered, pr => {
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

  filtered = _.orderBy(filtered, filters.orderBy, "desc");

  return filtered;
};

const mapStateToProps = state => ({
  selectedRepos: state.settings.selectedRepos,
  token: state.settings.token,
  autoRefreshEnabled: state.settings.autoRefreshEnabled,
  autoRefreshInterval: state.settings.autoRefreshInterval,
  githubError: state.dashboard.githubError,
  loading: state.dashboard.loading,
  filters: state.dashboard.filters,
  pullRequests: state.dashboard.pullRequests,
  filteredPullRequests: applyFilters(
    state.dashboard.pullRequests,
    _.extend(
      {
        hideOldEnabled: state.settings.hideOldEnabled,
        hideOldThreshold: state.settings.hideOldThreshold
      },
      state.dashboard.filters
    )
  )
});

const mapDispatchToProps = dispatch => ({
  requestPullRequests: (repoIds, token) => {
    dispatch(actions.requestPullRequests(repoIds, token));
  },
  setFilters: filters => {
    dispatch(actions.setFilters(filters));
  },
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
