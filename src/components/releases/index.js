import Octicon, { Sync as SyncIcon } from "@githubprimer/octicons-react";
import Markdown from "markdown-to-jsx";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/releases";
import { isoToRelative } from "../../utils";
import "./style.css";

class Releases extends React.PureComponent {
  componentDidMount() {
    const {
      token,
      selectedRepos,
      location,
      releases,
      requestReleases
    } = this.props;

    if (token && selectedRepos.length) {
      if (((location || {}).state || {}).refresh || !releases.length) {
        requestReleases(selectedRepos, token);
      }
    }
  }

  render() {
    const {
      releases,
      loading,
      requestReleases,
      selectedRepos,
      token
    } = this.props;

    return (
      <>
        <div className="App-menu p-3 bg-gray-light border-bottom">
          <div className="container-lg d-flex flex-items-center">
            <div className="flex-auto">
              <h1 className="h3">Releases</h1>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => requestReleases(selectedRepos, token)}
                disabled={loading}
              >
                <Octicon icon={SyncIcon} /> {loading ? "Loading..." : "Refresh"}
              </button>
            </div>
          </div>
        </div>
        <main className="App-main">
          <div className="container-lg py-4">
            <h1 />
            {releases.map(
              ({
                id,
                author,
                publishedAt,
                url,
                name,
                repoUrl,
                repoName,
                description
              }) => (
                <div
                  key={id}
                  className="d-flex flex-items-baseline border-bottom border-gray py-3"
                >
                  {author.avatarUrl && (
                    <div className="mr-3">
                      <a href={author.url} className="d-block">
                        <img
                          className="avatar rounded-1"
                          src={author.avatarUrl}
                          width="32"
                          height="32"
                          alt=""
                        />
                      </a>
                    </div>
                  )}
                  <div className="d-flex flex-column width-full">
                    <div className="d-flex flex-items-baseline">
                      <div>
                        <a
                          href={author.url}
                          className="link-gray-dark no-underline text-bold wb-break-all d-inline-block"
                        >
                          {author.login}
                        </a>{" "}
                        released <a href={url}>{name}</a> at{" "}
                        <a
                          href={repoUrl}
                          className="link-gray-dark no-underline text-bold wb-break-all d-inline-block"
                        >
                          {repoName}
                        </a>
                      </div>
                      <span
                        className="f6 text-gray-light no-wrap ml-1"
                        title={publishedAt}
                      >
                        {isoToRelative(publishedAt)}
                      </span>
                    </div>
                    <div className="ReleaseNotes Box p-3 mt-2 bg-gray">
                      <Markdown>{description}</Markdown>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  selectedRepos: state.settings.selectedRepos,
  token: state.settings.token,
  githubError: state.releases.githubError,
  loading: state.releases.loading,
  lastUpdated: state.releases.lastUpdated,
  releases: state.releases.releases
});

const mapDispatchToProps = dispatch => ({
  requestReleases: (repoIds, token) =>
    dispatch(actions.requestReleases(repoIds, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Releases);
