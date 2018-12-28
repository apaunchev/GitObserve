import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Octicon, {
  Sync as SyncIcon,
  CloudUpload as CloudUploadIcon,
  LinkExternal as LinkExternalIcon
} from "@githubprimer/octicons-react";
import * as settingsActions from "../actions/settings";
import * as watchedReposActions from "../actions/watchedRepos";

class Settings extends React.PureComponent {
  componentDidMount() {
    if (!this.props.watchedRepos.length) {
      this.props.requestWatchedRepos();
    }
  }

  render() {
    const {
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
        <div className="App-menu p-3 bg-gray-light border-bottom">
          <div className="container-lg d-flex flex-items-center">
            <div className="flex-auto">
              <h1 className="h3">Settings</h1>
            </div>
            <div>
              <button className="btn mr-2" onClick={requestWatchedRepos}>
                <Octicon icon={SyncIcon} /> Sync
              </button>
              <Link to="/" className="btn btn-primary">
                <Octicon icon={CloudUploadIcon} /> Save
              </Link>
            </div>
          </div>
        </div>
        <main className="App-main">
          <div className="container-lg py-4">
            <div className="Box">
              <div className="Box-header py-2 d-flex flex-items-center">
                <h3 className="Box-title">
                  Selected repositories{" "}
                  <span className="Counter Counter--gray-dark">
                    {selectedRepos.length}
                  </span>
                </h3>
                <div className="flex-auto text-right">
                  <span className="text-small text-gray mr-2">
                    Only repositories you are{" "}
                    <a href="https://github.com/watching">watching</a> are
                    listed here.
                  </span>
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
                </div>
              </div>

              {loading ? (
                <div className="blankslate blankslate-clean-background">
                  <p>Loading...</p>
                </div>
              ) : null}

              {githubError ? (
                <div className="blankslate blankslate-clean-background">
                  <p>Error getting watched repositories from GitHub.</p>
                </div>
              ) : null}

              {!loading && !watchedRepos.length ? (
                <div className="blankslate blankslate-clean-background">
                  <p>You are not watching any repositories currently.</p>
                </div>
              ) : null}

              {!loading
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
                          <Octicon icon={LinkExternalIcon} size="14" /> Open on
                          GitHub
                        </a>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </main>
      </>
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
