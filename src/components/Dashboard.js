import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Octicon, {
  Settings as SettingsIcon,
  Sync as SyncIcon,
  GitPullRequest as GitPullRequestIcon
} from "@githubprimer/octicons-react";
import { requestPullRequests } from "../actions/dashboard";
import PullRequest from "./PullRequest";

class Dashboard extends React.PureComponent {
  state = {
    orderByField: "updatedAt",
    sortByRepo: false,
    filterByAuthor: ""
  };

  componentDidMount() {
    if (this.props.selectedRepos.length > 0) {
      this.props.requestPullRequests(
        this.props.selectedRepos,
        this.props.token
      );
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  render() {
    const { orderByField, sortByRepo, filterByAuthor } = this.state;
    const {
      selectedRepos,
      pullRequests,
      loading,
      githubError,
      requestPullRequests,
      token
    } = this.props;
    let authors = [];
    let orderFields = [orderByField];
    let orderDirections = ["desc"];
    let formattedPrs = [];

    if (pullRequests.length > 0) {
      formattedPrs = _.map(pullRequests, pr => ({
        ...pr,
        repoName: pr.repository.nameWithOwner
      }));

      authors = _.chain(formattedPrs)
        .map(pr => pr.author)
        .uniqBy("login")
        .value();

      if (sortByRepo) {
        orderFields.unshift("repoName");
        orderDirections.unshift("asc");
      }

      if (orderByField) {
        formattedPrs = _.orderBy(formattedPrs, orderFields, orderDirections);
      }

      if (filterByAuthor) {
        formattedPrs = _.filter(
          formattedPrs,
          pr => pr.author.login === filterByAuthor
        );
      }
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
            </div>
          </div>
        </div>
        <main className="App-main">
          <div className="container-lg py-4">
            <div className="Box">
              <div className="Box-header d-flex flex-items-center">
                <div className="flex-auto d-flex flex-items-center">
                  <span className="d-inline-flex flex-items-center mr-3 text-bold">
                    <Octicon
                      icon={GitPullRequestIcon}
                      size={20}
                      className="pr-1"
                    />
                    {formattedPrs.length} pull requests
                  </span>
                  <span className="text-gray mr-2">Order by:</span>
                  <select
                    className="form-select select-sm mr-2"
                    name="orderByField"
                    value={this.state.orderByField}
                    onChange={this.handleInputChange}
                  >
                    <option value={"updatedAt"}>recently updated</option>
                    <option value={"createdAt"}>newest</option>
                  </select>
                  <select
                    className="form-select select-sm mr-2"
                    name="filterByAuthor"
                    value={this.state.filterByAuthor}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Select author</option>
                    {authors.map(({ login }) => (
                      <option key={login} value={login}>
                        {login}
                      </option>
                    ))}
                  </select>
                  <label className="mr-2">
                    <input
                      type="checkbox"
                      name="sortByRepo"
                      value={sortByRepo}
                      onChange={this.handleInputChange}
                    />{" "}
                    Sort by repository
                  </label>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => requestPullRequests(selectedRepos, token)}
                  >
                    <Octicon icon={SyncIcon} /> Sync
                  </button>
                </div>
              </div>

              {!selectedRepos.length ? (
                <div className="blankslate blankslate-clean-background">
                  <p>
                    You have not selected any{" "}
                    <Link to="/settings/repositories">repositories</Link> yet.
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
              !formattedPrs.length ? (
                <div className="blankslate blankslate-clean-background">
                  <p>
                    No pull requests were found for your{" "}
                    <Link to="/settings">selected repositories</Link>.
                  </p>
                </div>
              ) : null}

              {!loading && !githubError && formattedPrs.length
                ? formattedPrs.map(pr => <PullRequest key={pr.id} {...pr} />)
                : null}
            </div>
          </div>
        </main>
      </>
    );
  }
}

Dashboard.propTypes = {
  selectedRepos: PropTypes.arrayOf(PropTypes.string),
  githubError: PropTypes.string,
  loading: PropTypes.bool,
  pullRequests: PropTypes.arrayOf(PropTypes.shape()),
  token: PropTypes.string
};

Dashboard.defaultProps = {
  selectedRepos: [],
  token: null,
  pullRequests: [],
  loading: false,
  githubError: null
};

const mapStateToProps = state => ({
  selectedRepos: state.settings.selectedRepos,
  token: state.settings.token,
  githubError: state.dashboard.githubError,
  loading: state.dashboard.loading,
  pullRequests: state.dashboard.pullRequests
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
