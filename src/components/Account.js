import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as settingsActions from "../actions/settings";

class Account extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  render() {
    const { token, setToken } = this.props;

    return (
      <>
        <div className="Subhead">
          <h2 className="Subhead-heading">Account</h2>
        </div>
        <p>
          You need to add a Personal Access Token in order to access GitHub
          data.
        </p>
        <ol className="pl-3">
          <li>
            Go to{" "}
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
            >
              Personal Access Tokens
            </a>{" "}
            and click <b>Generate new token</b>.
          </li>
          <li>
            Enter a description, select the <code>repo</code> scope, then click{" "}
            <b>Generate token</b>.
          </li>
          <li>Copy the given token and add it below.</li>
        </ol>
        <form className="my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Token"
            ref={this.input}
            onChange={() => setToken(this.input.current.value)}
            value={token}
          />
        </form>
      </>
    );
  }
}

Account.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func.isRequired
};

Account.defaultProps = {
  token: null
};

const mapStateToProps = state => ({
  token: state.settings.token
});

const mapDispatchToProps = dispatch => ({
  setToken: value => dispatch(settingsActions.setToken(value)),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
