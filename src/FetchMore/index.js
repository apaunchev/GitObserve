import React from "react";

const FetchMore = ({ children, loading, hasNextPage, cursor, fetchMore }) => (
  <div className="FetchMore">
    {!loading && (
      <button
        className="btn btn-outline btn-block"
        disabled={!hasNextPage}
        onClick={() => fetchMore(cursor)}
      >
        More {children}
      </button>
    )}
  </div>
);

export default FetchMore;
