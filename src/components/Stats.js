import { isSameMonth } from "date-fns";
import React from "react";
import PropTypes from "prop-types";

const Stats = ({ pullRequests }) => {
  const now = new Date();
  const total = pullRequests.length || 0;
  const openedThisMonth =
    pullRequests.filter(pr => isSameMonth(new Date(pr.createdAt), now))
      .length || 0;
  const updatedThisMonth =
    pullRequests.filter(pr => isSameMonth(new Date(pr.updatedAt), now))
      .length || 0;

  return (
    <div className="d-flex mb-4">
      <div className="col-4 p-2 border text-center">
        <h3 className="f4 text-gray-light">Total open</h3>
        <span className="f1">{total}</span>
      </div>
      <div className="col-4 p-2 border text-center">
        <h3 className="f4 text-gray-light">Opened this month</h3>
        <span className="f1">{openedThisMonth}</span>
      </div>
      <div className="col-4 p-2 border text-center">
        <h3 className="f4 text-gray-light">Updated this month</h3>
        <span className="f1">{updatedThisMonth}</span>
      </div>
    </div>
  );
};

Stats.propTypes = {
  pullRequests: PropTypes.arrayOf(PropTypes.shape())
};

export default Stats;
