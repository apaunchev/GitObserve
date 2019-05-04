import { isEmpty } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/settings";

const DEFAULT_AVATAR_URL =
  "https://user-images.githubusercontent.com/334891/29999089-2837c968-9009-11e7-92c1-6a7540a594d5.png";

class Avatar extends React.Component {
  componentDidMount() {
    if (isEmpty(this.props.viewerInfo) && this.props.token) {
      this.props.requestViewerInfo(this.props.token);
    }
  }

  render() {
    const { viewerInfo, loading, githubError } = this.props;
    const avatarUrl =
      !loading && !githubError && viewerInfo.avatarUrl
        ? viewerInfo.avatarUrl
        : DEFAULT_AVATAR_URL;

    return (
      <Link to="/settings/account">
        <img
          className="avatar avatar-small"
          src={avatarUrl}
          width={32}
          height={32}
          alt="Avatar"
        />
      </Link>
    );
  }
}

const mapStateToProps = state => ({
  token: state.settings.token,
  viewerInfo: state.settings.viewerInfo,
  githubError: state.settings.githubError,
  loading: state.settings.loading
});

const mapDispatchToProps = dispatch => ({
  requestViewerInfo: token => dispatch(actions.requestViewerInfo(token)),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);
