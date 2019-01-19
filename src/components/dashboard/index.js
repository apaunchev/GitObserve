import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Octicon, {
  Settings as SettingsIcon,
  Sync as SyncIcon
} from "@githubprimer/octicons-react";
import * as actions from "../../actions/dashboard";
import PullRequest from "./pull-request";
import Flash from "../common/flash";
import Stats from "./stats";
import Filters from "./filters";

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateInterval = null;
  }

  componentDidMount() {
    if (this.props.selectedRepos.length > 0) {
      this.props.requestPullRequests(
        this.props.selectedRepos,
        this.props.token
      );

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
                <Stats pullRequests={pullRequests} />
                <div className="Box">
                  <div className="Box-header d-flex flex-items-center">
                    <div className="flex-auto d-flex flex-items-center">
                      <Filters pullRequests={pullRequests} />
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
                      >
                        <Octicon icon={SyncIcon} /> Sync
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="blankslate blankslate-clean-background">
                      <p>Loading...</p>
                    </div>
                  ) : null}

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

                  {!loading && !githubError && filteredPullRequests.length > 0
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

  if (filters.repo) {
    filtered = _.filter(filtered, pr => pr.repoName === filters.repo);
  }

  if (filters.author) {
    filtered = _.filter(filtered, pr => pr.author.login === filters.author);
  }

  if (filters.reviewState) {
    filtered = _.filter(filtered, pr => pr.reviewState === filters.reviewState);
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
  pullRequests: state.dashboard.pullRequests,
  filteredPullRequests: applyFilters(
    state.dashboard.pullRequests,
    state.dashboard.filters
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
