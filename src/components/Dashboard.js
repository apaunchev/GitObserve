import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Octicon, {
  Settings as SettingsIcon,
  Sync as SyncIcon
} from "@githubprimer/octicons-react";
import { requestPullRequests } from "../actions/dashboard";
import PullRequest from "./PullRequest";

class Dashboard extends React.PureComponent {
  state = {
    sortField: "updatedAt",
    sortDirection: "desc"
  };

  componentDidMount() {
    if (this.props.selectedRepos.length > 0) {
      this.props.requestPullRequests(
        this.props.selectedRepos,
        this.props.token
      );
    }
  }

  render() {
    const { sortField, sortDirection } = this.state;
    const {
      selectedRepos,
      pullRequests,
      loading,
      githubError,
      requestPullRequests,
      token
    } = this.props;

    let sortedPullRequests = [];
    if (pullRequests.length > 0) {
      sortedPullRequests = pullRequests.sort((a, b) => {
        const dateA = new Date(a[sortField]);
        const dateB = new Date(b[sortField]);

        if (sortDirection === "desc") {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });
    }

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
              <button
                className="btn btn-primary"
                onClick={() => requestPullRequests(selectedRepos, token)}
              >
                <Octicon icon={SyncIcon} /> Sync
              </button>
            </div>
          </div>
        </div>
        <main className="App-main">
          <div className="container-lg py-4">
            <div className="Box">
              <div className="Box-header">
                <h3 className="Box-title">
                  Pull requests{" "}
                  <span className="Counter">{pullRequests.length}</span>
                </h3>
              </div>

              {!selectedRepos.length ? (
                <div className="blankslate blankslate-clean-background">
                  <p>
                    You have not <Link to="/settings">selected</Link> any
                    repositories yet.
                  </p>
                </div>
              ) : null}

              {selectedRepos.length > 0 && loading ? (
                <div className="blankslate blankslate-clean-background">
                  <p>Loading...</p>
                </div>
              ) : null}

              {selectedRepos.length > 0 && githubError ? (
                <div className="blankslate blankslate-clean-background">
                  <p>
                    Error fetching data from GitHub. Ensure your{" "}
                    <Link to="/settings/account">token</Link> is set correctly
                    and try again.
                  </p>
                </div>
              ) : null}

              {selectedRepos.length > 0 &&
              !loading &&
              !githubError &&
              !pullRequests.length ? (
                <div className="blankslate blankslate-clean-background">
                  <p>
                    No pull requests were found for your{" "}
                    <Link to="/settings">selected repositories</Link>.
                  </p>
                </div>
              ) : null}

              {!loading && !githubError && sortedPullRequests.length ? (
                <ul>
                  {sortedPullRequests.map(pr => (
                    <PullRequest key={pr.id} {...pr} />
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  selectedRepos: state.settings.selectedRepos,
  githubError: state.dashboard.githubError,
  loading: state.dashboard.loading,
  pullRequests: state.dashboard.pullRequests,
  token: state.settings.token
});

const mapDispatchToProps = dispatch => ({
  requestPullRequests: (repoIds, token) => {
    dispatch(requestPullRequests(repoIds, token));
  },
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
