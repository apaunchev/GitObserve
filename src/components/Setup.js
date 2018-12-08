import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { requestGithubToken } from "../actions/setup";
import { requestCurrentUser } from "../actions/home";
import SignIn from "./SignIn";

class Setup extends React.PureComponent {
  state = {
    autoRequestedCurrentUser: false
  };

  async componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];

    if (code) {
      this.props.requestGithubToken(code);
    }
  }

  async componentDidUpdate() {
    if (
      this.props.githubToken &&
      !this.props.currentUser &&
      !this.props.currentUserLoading &&
      !this.state.autoRequestedCurrentUser
    ) {
      await this.props.requestCurrentUser(this.props.githubToken);
      this.setState({ autoRequestedCurrentUser: true });
    }
  }

  requestCurrentUser() {
    this.props.requestCurrentUser(this.props.githubToken);
  }

  render() {
    const loader = message => (
      <div className="Loading">
        <p>{message}</p>
      </div>
    );

    const loginError = this.props.githubTokenError ? (
      <div className="Error">Github sign-in failed.</div>
    ) : null;

    const currentUserError = this.props.currentUserError ? (
      <div>
        <p>Error requesting your user profile from Github.</p>
        <button onClick={this.requestCurrentUser}>Try again</button>
      </div>
    ) : null;

    const githubTokenLoader = this.props.githubTokenLoading
      ? loader("Authenticating with Github...")
      : null;

    const currentUserLoader = this.props.currentUserLoading
      ? loader("Loading your Github profile...")
      : null;

    return (
      <div className="Setup">
        {loginError}
        {currentUserError}
        {githubTokenLoader}
        {currentUserLoader}

        {!this.props.githubToken ? (
          <SignIn githubToken={this.props.githubToken} />
        ) : null}

        {this.props.currentUser ? (
          <div>
            <p>
              Successfully signed in as{" "}
              <strong>{this.props.currentUser.login}</strong>!
            </p>
            <Link to="/select">
              <button>Select repositories</button>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  githubToken: state.setup.githubToken,
  githubTokenLoading: state.setup.githubTokenLoading,
  githubTokenError: state.setup.githubTokenError,
  currentUser: state.home.currentUser,
  currentUserLoading: state.home.currentUserLoading,
  currentUserError: state.home.currentUserError
});

const mapDispatchToProps = dispatch => ({
  requestGithubToken: code => {
    dispatch(requestGithubToken(code));
  },
  requestCurrentUser: token => {
    dispatch(requestCurrentUser(token));
  },
  dispatch
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Setup)
);
