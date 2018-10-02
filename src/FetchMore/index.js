import React from "react";

const FetchMore = ({ children, loading, hasNextPage, variables, fetchMore }) => (
  <div className="FetchMore">
    {!loading && (
      <button
        className="btn btn-outline btn-block"
        disabled={!hasNextPage}
        onClick={() => fetchMore(variables)}
      >
        More {children}
      </button>
    )}
  </div>
);

export default FetchMore;
