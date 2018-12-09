import React from "react";
import { connect } from "react-redux";

class Dashboard extends React.PureComponent {
  render() {
    if (!this.props.githubToken) {
      return <p>Not signed in.</p>;
    }

    if (!this.props.selectedRepos.length) {
      return <p>You have not selected any repos.</p>;
    }

    return (
      <div className="Dashboard">
        {this.props.selectedRepos.map(repo => (
          <li key={repo}>{repo}</li>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  githubToken: state.setup.githubToken,
  selectedRepos: state.select.selectedRepos
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
