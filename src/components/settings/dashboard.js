import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/settings";
import { PR_STALENESS } from "../../constants";

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
      <div className="form-checkbox">
        <label>
          <input
            type="checkbox"
            checked={props.stalenessLabelsEnabled}
            onChange={props.toggleStalenessLabels}
          />{" "}
          Show staleness labels
        </label>
        <p className="note">
          Displays a label on{" "}
          <span
            className="Label Label--outline tooltipped tooltipped-sw"
            aria-label="Updated <7 days ago"
            style={{
              color: PR_STALENESS.FRESH.color,
              borderColor: PR_STALENESS.FRESH.color
            }}
          >
            {PR_STALENESS.FRESH.label}
          </span>{" "}
          and{" "}
          <span
            className="Label Label--outline tooltipped tooltipped-sw"
            aria-label="Updated >28 days ago"
            style={{
              color: PR_STALENESS.STALE.color,
              borderColor: PR_STALENESS.STALE.color
            }}
          >
            {PR_STALENESS.STALE.label}
          </span>{" "}
          pull requests.
        </p>
      </div>
    </form>
  </>
);

const mapStateToProps = state => ({
  autoRefreshEnabled: state.settings.autoRefreshEnabled,
  autoRefreshInterval: state.settings.autoRefreshInterval,
  stalenessLabelsEnabled: state.settings.stalenessLabelsEnabled
});

const mapDispatchToProps = dispatch => ({
  toggleAutoRefresh: () => dispatch(actions.toggleAutoRefresh()),
  setAutoRefreshInterval: interval =>
    dispatch(actions.setAutoRefreshInterval(interval)),
  toggleStalenessLabels: () => dispatch(actions.toggleStalenessLabels()),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
