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
        <p class="note">
          Refreshes the dashboard with new pull requests periodically.
        </p>
      </div>
    </form>
  </>
);

const mapStateToProps = state => ({
  autoRefreshEnabled: state.settings.autoRefreshEnabled,
  autoRefreshInterval: state.settings.autoRefreshInterval
});

const mapDispatchToProps = dispatch => ({
  toggleAutoRefresh: () => dispatch(actions.toggleAutoRefresh()),
  setAutoRefreshInterval: interval =>
    dispatch(actions.setAutoRefreshInterval(interval)),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
