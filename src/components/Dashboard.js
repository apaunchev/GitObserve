import React from "react";
import { connect } from "react-redux";
import { requestPullRequests } from "../actions/dashboard";
import PullRequest from "./PullRequest";

class Dashboard extends React.PureComponent {
  state = {
    sortField: "updatedAt",
    sortDirection: "desc"
  };

  componentDidMount() {
    if (this.props.selectedRepos.length > 0) {
      this.props.requestPullRequests(this.props.selectedRepos);
    }
  }

  render() {
    const { sortField, sortDirection } = this.state;
    const { pullRequests, loading, githubError } = this.props;

    if (loading) {
      return <p>Loading your pull requests...</p>;
    }

    if (githubError) {
      return <p>Error getting latest pull requests from GitHub.</p>;
    }

    if (!pullRequests.length) {
      return <p>No pull requests were found for your selected repositories.</p>;
    }

    let sortedPullRequests = [];
    sortedPullRequests = pullRequests.sort((a, b) => {
      const dateA = new Date(a[sortField]);
      const dateB = new Date(b[sortField]);

      if (sortDirection === "desc") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    return sortedPullRequests.map(pr => <PullRequest key={pr.id} {...pr} />);
  }
}

const mapStateToProps = state => ({
  selectedRepos: state.settings.selectedRepos,
  githubError: state.dashboard.githubError,
  loading: state.dashboard.loading,
  pullRequests: state.dashboard.pullRequests
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
