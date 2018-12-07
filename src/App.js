import React from "react";
import withToken from "./withToken";
import Login from "./Login";

class App extends React.Component {
  render() {
    const { githubToken } = this.props;

    if (!githubToken) {
      return <Login />;
    }

    return <div className="App">{githubToken}</div>;
  }
}

export default withToken(App);
