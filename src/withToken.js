import React from "react";

const LS_GITHUB_TOKEN = "go_github_token";

const withToken = WrappedComponent => {
  class WithToken extends React.Component {
    state = {
      token: null
    };

    async componentDidMount() {
      const token = window.localStorage.getItem(LS_GITHUB_TOKEN);
      if (token) {
        this.setState({ token });
      } else {
        const code =
          window.location.href.match(/\?code=(.*)/) &&
          window.location.href.match(/\?code=(.*)/)[1];
        if (code) {
          const token = await this.requestToken(code);
          if (token) {
            this.setState({ token }, () =>
              window.localStorage.setItem(LS_GITHUB_TOKEN, token)
            );
          }
        }
      }
    }

    requestToken = async code => {
      const response = await fetch(
        `${process.env.REACT_APP_AUTH_API_URI}/${code}`
      );
      if (response.ok) {
        const result = await response.json();
        if (result.error) {
          throw Error(`Error while authenticating: ${result.error}`);
        }
        if (result.token) {
          return result.token;
        }
      }
      throw Error("Error while authenticating.");
    };

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }

  return WithToken;
};

export default withToken;
