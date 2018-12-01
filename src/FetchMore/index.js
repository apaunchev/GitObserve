import React from "react";

import Loading from "../Loading";

const FetchMore = ({
  loading,
  hasNextPage,
  variables,
  updateQuery,
  fetchMore,
  children
}) => (
  <div className="FetchMore">
    {loading ? (
      <Loading />
    ) : (
      <button
        className="btn btn-outline btn-block"
        disabled={!hasNextPage}
        onClick={() => fetchMore({ variables, updateQuery })}
      >
        More {children}
      </button>
    )}
  </div>
);

export default FetchMore;
