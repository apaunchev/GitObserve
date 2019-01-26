import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/dashboard";

const DEFAULT_FILTERS = {
  repo: "",
  author: "",
  orderBy: "updatedAt"
};

const Filters = props => {
  const handleSelectChange = e => {
    props.setFilters({
      ...props.filters,
      [e.target.name]: e.target.value
    });
  };

  const renderAuthorsSelect = () => {
    const authors = _.chain(props.pullRequests)
      .map(pr => pr.author)
      .uniqBy("login")
      .value();

    return (
      <select
        className="form-select select-sm mr-2"
        name="author"
        value={props.filters.author}
        onChange={handleSelectChange}
        style={{ width: "130px" }}
      >
        <option value="">all authors</option>
        {authors.map(({ login }) => (
          <option key={login} value={login}>
            {login}
          </option>
        ))}
      </select>
    );
  };

  const renderReposSelect = () => {
    const repos = _.chain(props.pullRequests)
      .map(pr => pr.repoName)
      .uniqBy()
      .value();

    return (
      <select
        className="form-select select-sm mr-2"
        name="repo"
        value={props.filters.repo}
        onChange={handleSelectChange}
        style={{ width: "130px" }}
      >
        <option value="">all repositories</option>
        {repos.map(repo => (
          <option key={repo} value={repo}>
            {repo}
          </option>
        ))}
      </select>
    );
  };

  const renderReviewStateSelect = () => {
    const reviewStates = _.chain(props.pullRequests)
      .map(pr => pr.reviewState)
      .uniqBy()
      .compact()
      .value();

    return (
      <select
        className="form-select select-sm mr-2"
        name="reviewState"
        value={props.filters.reviewState}
        onChange={handleSelectChange}
        style={{ width: "130px" }}
      >
        <option value="">all review states</option>
        {reviewStates.map(state => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    );
  };

  const renderOrderBySelect = () => (
    <select
      className="form-select select-sm mr-2"
      name="orderBy"
      value={props.filters.orderBy}
      onChange={handleSelectChange}
      style={{ width: "130px" }}
    >
      <option value={"updatedAt"}>recently updated</option>
      <option value={"createdAt"}>newest</option>
    </select>
  );

  return (
    <>
      <span className="text-gray mr-2">Show ({props.filteredCount}):</span>
      {renderAuthorsSelect()}
      {renderReposSelect()}
      {renderReviewStateSelect()}
      <span className="text-gray mr-2">Order by:</span>
      {renderOrderBySelect()}
      <button
        className="btn btn-sm"
        onClick={() => props.setFilters(DEFAULT_FILTERS)}
      >
        Reset
      </button>
    </>
  );
};

Filters.propTypes = {
  pullRequests: PropTypes.arrayOf(PropTypes.object)
};

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
)(Filters);
