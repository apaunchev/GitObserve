import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
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

  const renderOrderBySelect = () => (
    <select
      className="form-select select-sm mr-2"
      name="orderBy"
      value={props.filters.orderBy}
      onChange={handleSelectChange}
    >
      <option value={"updatedAt"}>recently updated</option>
      <option value={"createdAt"}>newest</option>
    </select>
  );

  return (
    <>
      <span className="text-gray mr-2">Show:</span>
      {renderAuthorsSelect()}
      {renderReposSelect()}
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
