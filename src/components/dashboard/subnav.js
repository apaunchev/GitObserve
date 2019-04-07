import Octicon, { Search as SearchIcon } from "@githubprimer/octicons-react";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/dashboard";

class SubNav extends React.PureComponent {
  handleReviewStateChange = e => {
    e.preventDefault();

    this.props.setFilters({
      ...this.props.filters,
      reviewState: e.target.dataset.reviewState
    });
  };

  render() {
    const { filters, setFilters } = this.props;

    return (
      <div className="subnav d-flex">
        <nav className="subnav-links flex-auto">
          <a
            href="/"
            data-review-state=""
            onClick={this.handleReviewStateChange}
            className={`subnav-item${
              filters.reviewState === "" ? " selected" : ""
            }`}
          >
            All
          </a>
          <a
            href="/"
            data-review-state="review requested"
            onClick={this.handleReviewStateChange}
            className={`subnav-item${
              filters.reviewState === "review requested" ? " selected" : ""
            }`}
          >
            Review requested
          </a>
          <a
            href="/"
            data-review-state="changes requested"
            onClick={this.handleReviewStateChange}
            className={`subnav-item${
              filters.reviewState === "changes requested" ? " selected" : ""
            }`}
          >
            Changes requested
          </a>
          <a
            href="/"
            data-review-state="commented"
            onClick={this.handleReviewStateChange}
            className={`subnav-item${
              filters.reviewState === "commented" ? " selected" : ""
            }`}
          >
            Commented
          </a>
          <a
            href="/"
            data-review-state="approved"
            onClick={this.handleReviewStateChange}
            className={`subnav-item${
              filters.reviewState === "approved" ? " selected" : ""
            }`}
          >
            Approved
          </a>
        </nav>
        <div className="subnav-search col-3">
          <input
            type="search"
            name="name"
            className="form-control input-contrast"
            style={{ width: "100%", paddingLeft: 28 }}
            placeholder="Search pull requests..."
            value={filters.searchQuery}
            onChange={e =>
              setFilters({
                ...filters,
                searchQuery: e.target.value
              })
            }
          />
          <Octicon icon={SearchIcon} className="subnav-search-icon" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.dashboard.filters
});

const mapDispatchToProps = dispatch => ({
  setFilters: filters => {
    dispatch(actions.setFilters(filters));
  },
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubNav);
