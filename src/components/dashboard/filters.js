import { chain } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/dashboard";

const DEFAULT_FILTERS = {
  repo: "",
  author: "",
  orderBy: "updatedAt",
  reviewState: "",
  searchQuery: ""
};

const Filters = props => {
  const handleSelectChange = e => {
    props.setFilters({
      ...props.filters,
      [e.target.name]: e.target.value
    });
  };

  const renderAuthorsSelect = () => {
    const authors = chain(props.pullRequests)
      .countBy(pr => pr.author.login)
      .toPairs()
      .orderBy(1, "desc")
      .fromPairs()
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
        {Object.keys(authors).map(author => (
          <option key={author} value={author}>
            {author} ({authors[author]})
          </option>
        ))}
      </select>
    );
  };

  const renderReposSelect = () => {
    const repos = chain(props.pullRequests)
      .countBy(pr => pr.repoName)
      .toPairs()
      .orderBy(1, "desc")
      .fromPairs()
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
        {Object.keys(repos).map(repo => (
          <option key={repo} value={repo}>
            {repo} ({repos[repo]})
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
      <option value={"reviewedAt"}>recently reviewed</option>
      <option value={"createdAt"}>recently created</option>
    </select>
  );

  return (
    <>
      <span className="text-gray mr-2">Show ({props.filteredCount}):</span>
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
