import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/settings";

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

    return (
      <div className="Select">
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
        <button onClick={() => this.props.resetSelectedRepos()}>reset</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  watchedRepos: state.settings.watchedRepos,
  selectedRepos: state.settings.selectedRepos,
  loading: state.settings.loading
});

const mapDispatchToProps = dispatch => ({
  requestWatchedRepos: () => dispatch(actions.requestWatchedRepos()),
  toggleRepoSelection: id => dispatch(actions.toggleRepoSelection(id)),
  resetSelectedRepos: () => dispatch(actions.resetSelectedRepos()),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
