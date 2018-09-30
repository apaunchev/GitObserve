import React from "react";

const FetchMore = ({ children, loading, hasNextPage, endCursor, fetchMore }) => (
  <div className="FetchMore">
    {!loading && (
      <button
        className="btn btn-outline btn-block"
        disabled={!hasNextPage}
        onClick={() => fetchMore(endCursor)}
      >
        More {children}
      </button>
    )}
  </div>
);

export default FetchMore;
