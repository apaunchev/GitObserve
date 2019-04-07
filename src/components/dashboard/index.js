import Octicon, {
  Settings as SettingsIcon,
  Sync as SyncIcon
} from "@githubprimer/octicons-react";
import { differenceInDays } from "date-fns";
import { extend, filter, orderBy } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/dashboard";
import Blankslate from "../common/blankslate";
import Flash from "../common/flash";
import Filters from "./filters";
import PullRequest from "./pull-request";
import SubNav from "./subnav";

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

  render() {
    const {
      selectedRepos,
      pullRequests,
      filteredPullRequests,
      loading,
      githubError,
      requestPullRequests,
      token,
      autoRefreshEnabled
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
                <SubNav />
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
                    <Blankslate>
                      <p>
                        Error fetching data from GitHub. Ensure your{" "}
                        <Link to="/settings/account">token</Link> is set
                        correctly and try again.
                      </p>
                    </Blankslate>
                  ) : null}

                  {!loading && !githubError && !filteredPullRequests.length ? (
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
  autoRefreshEnabled: state.settings.autoRefreshEnabled,
  autoRefreshInterval: state.settings.autoRefreshInterval,
  githubError: state.dashboard.githubError,
  loading: state.dashboard.loading,
  pullRequests: state.dashboard.pullRequests,
  filteredPullRequests: applyFilters(
    state.dashboard.pullRequests,
    extend(
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
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
