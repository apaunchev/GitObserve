import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/settings";

const Dashboard = props => (
  <>
    <div className="Subhead">
      <h2 className="Subhead-heading">Dashboard</h2>
    </div>
    <form>
      <div className="form-checkbox">
        <label>
          <input
            type="checkbox"
            checked={props.autoRefreshEnabled}
            onChange={props.toggleAutoRefresh}
          />{" "}
          Auto refresh dashboard every
          <select
            className="form-select select-sm ml-1"
            value={props.autoRefreshInterval}
            onChange={e => props.setAutoRefreshInterval(e.target.value)}
          >
            <option value="1">1 minute</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="30">30 minutes</option>
          </select>
        </label>
      </div>
      <div className="form-checkbox">
        <label>
          <input
            type="checkbox"
            checked={props.hideOldEnabled}
            onChange={props.toggleHideOld}
          />{" "}
          Hide requests older than
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
            checked={props.markAsNewEnabled}
            onChange={props.toggleMarkAsNew}
          />{" "}
          Mark pull requests as new if newer than
          <input
            type="number"
            className="form-control input-sm ml-1"
            style={{ width: "40px " }}
            value={props.markAsNewInterval}
            onChange={e => props.setMarkAsNewInterval(e.target.value)}
          />{" "}
          days
        </label>
        <p className="note">
          Displays an indicator on the left side of the pull request.
        </p>
      </div>
    </form>
  </>
);

const mapStateToProps = state => ({
  autoRefreshEnabled: state.settings.autoRefreshEnabled,
  autoRefreshInterval: state.settings.autoRefreshInterval,
  markAsNewEnabled: state.settings.markAsNewEnabled,
  markAsNewInterval: state.settings.markAsNewInterval,
  hideOldEnabled: state.settings.hideOldEnabled,
  hideOldThreshold: state.settings.hideOldThreshold
});

const mapDispatchToProps = dispatch => ({
  toggleAutoRefresh: () => dispatch(actions.toggleAutoRefresh()),
  setAutoRefreshInterval: interval =>
    dispatch(actions.setAutoRefreshInterval(interval)),
  toggleMarkAsNew: () => dispatch(actions.toggleMarkAsNew()),
  setMarkAsNewInterval: interval =>
    dispatch(actions.setMarkAsNewInterval(interval)),
  toggleHideOld: () => dispatch(actions.toggleHideOld()),
  setHideOldThreshold: interval =>
    dispatch(actions.setHideOldThreshold(interval)),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
