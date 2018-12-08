import React from "react";
import { connect } from "react-redux";
import { requestCurrentUser } from "../actions/home";

class Select extends React.PureComponent {
  componentDidMount() {
    if (this.props.githubToken && !this.props.currentUser) {
      this.props.requestCurrentUser(this.props.githubToken);
    }
  }

  render() {
    return (
      <div>
        {!this.props.currentUser ? (
          <p>Not signed in.</p>
        ) : (
          <p>{this.props.currentUser.login}</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  githubToken: state.setup.githubToken,
  currentUser: state.home.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestCurrentUser: token => {
    dispatch(requestCurrentUser(token));
  },
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);
