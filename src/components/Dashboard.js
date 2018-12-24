import { orderBy } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { requestPullRequests } from "../actions/home";

class Dashboard extends React.PureComponent {
  componentDidMount() {
    if (this.props.currentUser) {
      this.props.requestPullRequests(this.props.selectedRepos);
    }
  }

  render() {
    let sortedRepos = [];

    if (this.props.repositories.length > 0) {
      sortedRepos = orderBy(
        this.props.repositories,
        [repo => repo.pullRequests.length, repo => repo.name],
        ["desc", "asc"]
      );
    }

    if (this.props.pullRequestsError) {
      return <div>Error getting latest pull requests from GitHub.</div>;
    }

    return sortedRepos.map(repo => (
      <div key={repo.name}>
        {repo.name}, {repo.pullRequests.edges.length} pull requests
      </div>
    ));
  }
}

const mapStateToProps = state => ({
  currentUser: state.home.currentUser,
  selectedRepos: state.select.selectedRepos,
  repositories: state.home.repositories,
  pullRequestsError: state.home.pullRequestsError
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
