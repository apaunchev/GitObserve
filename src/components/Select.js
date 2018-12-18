import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../actions/select";

class Select extends React.PureComponent {
  componentDidMount() {
    if (!this.props.watchedRepos.length && this.props.githubToken) {
      this.props.requestWatchedRepos(this.props.githubToken);
    }
  }

  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/setup" />;
    }

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
  githubToken: state.setup.githubToken,
  watchedRepos: state.select.watchedRepos,
  selectedRepos: state.select.selectedRepos,
  loading: state.select.loading,
  currentUser: state.home.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestWatchedRepos: token => dispatch(actions.requestWatchedRepos(token)),
  toggleRepoSelection: id => dispatch(actions.toggleRepoSelection(id)),
  resetSelectedRepos: () => dispatch(actions.resetSelectedRepos()),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);
