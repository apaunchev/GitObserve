import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { requestPullRequests } from "../actions/dashboard";
import PullRequest from "./PullRequest";

class Dashboard extends React.PureComponent {
  componentDidMount() {
    if (this.props.selectedRepos.length > 0) {
      this.props.requestPullRequests(this.props.selectedRepos);
    }
  }

  render() {
    let pullRequests = [];

    if (this.props.repositories.length > 0) {
      pullRequests = _.chain(this.props.repositories)
        .map(repo => repo.pullRequests.edges)
        .flatten()
        .map("node")
        .value();
    }

    if (this.props.loading) {
      return <p>Loading your pull requests...</p>;
    }

    if (this.props.githubError) {
      return <p>Error getting latest pull requests from GitHub.</p>;
    }

    return pullRequests.map(pr => <PullRequest key={pr.id} {...pr} />);
  }
}

const mapStateToProps = state => ({
  selectedRepos: state.settings.selectedRepos,
  githubError: state.dashboard.githubError,
  loading: state.dashboard.loading,
  repositories: state.dashboard.repositories
});

const mapDispatchToProps = dispatch => ({
  requestPullRequests: repoIds => {
    dispatch(requestPullRequests(repoIds));
  },
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
