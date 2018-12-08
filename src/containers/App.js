import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "../components/Dashboard";
import SelectRepos from "../components/SelectRepos";
import Login from "../components/Login";
import { requestGithubToken } from "../actions/setup";

class App extends React.Component {
  async componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];

    if (code) {
      this.props.requestGithubToken(code);
    }
  }

  render() {
    return (
      <>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/selectRepos" component={SelectRepos} />
        {!this.props.githubToken && <Login />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  githubToken: state.setup.githubToken
});

const mapDispatchToProps = dispatch => ({
  requestGithubToken: code => {
    dispatch(requestGithubToken(code));
  },
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
