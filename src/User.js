import React from "react";
import { queries, get } from "./githubApi";

class User extends React.Component {
  state = {
    currentUser: null,
    currentUserLoading: true,
    currentUserError: null
  };

  async componentDidMount() {
    try {
      const { token } = this.props;

      if (token) {
        const query = queries.currentUser();
        const results = await get(query, token);

        if (results && results.viewer) {
          this.setState({
            currentUser: results.viewer,
            currentUserLoading: false
          });
        }
      }
    } catch (error) {
      this.setState({ currentUserError: error });
    }
  }

  render() {
    const { currentUser, currentUserLoading, currentUserError } = this.state;

    if (currentUserLoading) {
      return <div>Loading...</div>;
    }

    if (currentUserError) {
      return <div>Error</div>;
    }

    return <div>{currentUser.login}</div>;
  }
}

export default User;
