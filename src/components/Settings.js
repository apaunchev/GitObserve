import React from "react";
import { connect } from "react-redux";
import * as settingsActions from "../actions/settings";
import * as watchedReposActions from "../actions/watchedRepos";

class Settings extends React.PureComponent {
  componentDidMount() {
    if (!this.props.watchedRepos.length) {
      this.props.requestWatchedRepos();
    }
  }

  render() {
    if (this.props.loading) {
      return <p>Loading your repos...</p>;
    }

    if (this.props.githubError) {
      return <p>Error getting watched repositories from GitHub.</p>;
    }

    return (
      <div className="Select">
        <button
          onClick={() =>
            this.props.selectAllRepos(
              this.props.watchedRepos.map(repo => repo.id)
            )
          }
        >
          select all
        </button>
        <button onClick={() => this.props.resetSelectedRepos()}>reset</button>
        <fieldset>
          <legend>Select repos to monitor</legend>
          {this.props.watchedRepos.map(({ id, name }) => {
            const htmlId = `repo-${id}`;
            const checked = this.props.selectedRepos.includes(id);
            const onChange = () => this.props.toggleRepoSelection(id);

            return (
              <div key={id}>
                <input
                  type="checkbox"
                  id={htmlId}
                  onChange={onChange}
                  checked={checked}
                />
                <label htmlFor={htmlId}>{name}</label>
              </div>
            );
          })}
        </fieldset>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  watchedRepos: state.watchedRepos.repos,
  loading: state.watchedRepos.loading,
  githubError: state.watchedRepos.githubError,
  selectedRepos: state.settings.selectedRepos
});

const mapDispatchToProps = dispatch => ({
  requestWatchedRepos: () =>
    dispatch(watchedReposActions.requestWatchedRepos()),
  toggleRepoSelection: id => dispatch(settingsActions.toggleRepoSelection(id)),
  selectAllRepos: repoIds => dispatch(settingsActions.selectAllRepos(repoIds)),
  resetSelectedRepos: () => dispatch(settingsActions.resetSelectedRepos()),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
