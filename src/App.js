import React from "react";
import withToken from "./withToken";
import User from "./User";
import Login from "./Login";

class App extends React.Component {
  render() {
    if (!this.props.token) {
      return <Login />;
    }

    return (
      <div className="App">
        <User {...this.props} />
      </div>
    );
  }
}

export default withToken(App);
