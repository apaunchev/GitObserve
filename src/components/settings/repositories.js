import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Octicon, {
  Sync as SyncIcon,
  LinkExternal as LinkExternalIcon
} from "@githubprimer/octicons-react";
import * as settingsActions from "../../actions/settings";
import * as watchedReposActions from "../../actions/watchedRepos";

class Repositories extends React.PureComponent {
  componentDidMount() {
    this.props.requestWatchedRepos(this.props.token);
  }

  render() {
    const {
      token,
      loading,
      githubError,
      watchedRepos,
      selectedRepos,
      selectAllRepos,
      resetSelectedRepos,
      toggleRepoSelection,
      requestWatchedRepos
    } = this.props;

    return (
      <>
        <div className="Subhead">
          <h2 className="Subhead-heading">Repositories</h2>
        </div>
        <p className="mb-4">
          Select the repositories you wish to monitor on the dashboard.{" "}
          <strong>
            Only repositories you are{" "}
            <a href="https://github.com/watching">watching</a> are listed here.
          </strong>
        </p>
        <div className="Box">
          <div className="Box-header py-2 d-flex flex-items-center">
            <h3 className="Box-title">
              Selected repositories{" "}
              <span className="Counter Counter--gray-dark">
                {selectedRepos.length}
              </span>
            </h3>
            <div className="flex-auto text-right">
              <div className="BtnGroup">
                <button
                  className="BtnGroup-item btn btn-sm"
                  onClick={() =>
                    selectAllRepos(watchedRepos.map(repo => repo.id))
                  }
                >
                  Select all
                </button>
                <button
                  className="BtnGroup-item btn btn-sm"
                  onClick={() => resetSelectedRepos()}
                >
                  Reset
                </button>
              </div>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => requestWatchedRepos(token)}
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
                <Link to="/settings/account">token</Link> is set correctly and
                try again.
              </p>
            </div>
          ) : null}

          {!loading && !githubError && !watchedRepos.length ? (
            <div className="blankslate blankslate-clean-background">
              <p>You are not watching any repositories currently.</p>
            </div>
          ) : null}

          {!loading && !githubError && watchedRepos.length > 0
            ? watchedRepos.map(({ id, name, url }) => {
                const htmlId = `repo-${id}`;
                const checked = selectedRepos.includes(id);
                const onChange = () => toggleRepoSelection(id);
                return (
                  <div
                    className="Box-row Box-row--hover-gray d-flex flex-items-center py-2 px-3"
                    key={id}
                  >
                    <div className="form-checkbox flex-auto my-0">
                      <label>
                        <input
                          type="checkbox"
                          id={htmlId}
                          onChange={onChange}
                          checked={checked}
                        />{" "}
                        {name}
                      </label>
                    </div>
                    <a className="btn btn-sm btn-outline" href={url}>
                      <Octicon icon={LinkExternalIcon} size={14} /> Open on
                      GitHub
                    </a>
                  </div>
                );
              })
            : null}
        </div>
      </>
    );
  }
}

Repositories.propTypes = {
  watchedRepos: PropTypes.arrayOf(PropTypes.shape()),
  loading: PropTypes.bool,
  githubError: PropTypes.string,
  selectedRepos: PropTypes.arrayOf(PropTypes.string),
  token: PropTypes.string
};

Repositories.defaultProps = {
  watchedRepos: [],
  loading: false,
  githubError: null,
  selectedRepos: [],
  token: null
};

const mapStateToProps = state => ({
  watchedRepos: state.watchedRepos.repos,
  loading: state.watchedRepos.loading,
  githubError: state.watchedRepos.githubError,
  selectedRepos: state.settings.selectedRepos,
  token: state.settings.token
});

const mapDispatchToProps = dispatch => ({
  requestWatchedRepos: token =>
    dispatch(watchedReposActions.requestWatchedRepos(token)),
  toggleRepoSelection: id => dispatch(settingsActions.toggleRepoSelection(id)),
  selectAllRepos: repoIds => dispatch(settingsActions.selectAllRepos(repoIds)),
  resetSelectedRepos: () => dispatch(settingsActions.resetSelectedRepos()),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repositories);
