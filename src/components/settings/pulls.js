import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/settings";

const PullRequests = props => (
  <>
    <div className="Subhead">
      <h2 className="Subhead-heading">Pull requests</h2>
    </div>
    <form>
      <div className="form-checkbox">
        <label>
          <input
            type="checkbox"
            checked={props.hideOldEnabled}
            onChange={props.toggleHideOld}
          />{" "}
          Hide pull requests older than
          <input
            type="number"
            className="form-control input-sm ml-1"
            style={{ width: "40px " }}
            value={props.hideOldThreshold}
            onChange={e => props.setHideOldThreshold(e.target.value)}
          />{" "}
          days
        </label>
      </div>
      <div className="form-checkbox">
        <label>
          <input
            type="checkbox"
            checked={props.hideWithoutRequestEnabled}
            onChange={props.toggleHideWithoutRequest}
          />
          Hide pull requests without a review request
        </label>
      </div>
    </form>
  </>
);

const mapStateToProps = state => ({
  hideOldEnabled: state.settings.hideOldEnabled,
  hideOldThreshold: state.settings.hideOldThreshold,
  hideWithoutRequestEnabled: state.settings.hideWithoutRequestEnabled
});

const mapDispatchToProps = dispatch => ({
  toggleHideOld: () => dispatch(actions.toggleHideOld()),
  setHideOldThreshold: interval =>
    dispatch(actions.setHideOldThreshold(interval)),
  toggleHideWithoutRequest: () => dispatch(actions.toggleHideWithoutRequest()),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PullRequests);
