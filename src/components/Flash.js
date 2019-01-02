import React from "react";
import PropTypes from "prop-types";

const Flash = ({ type, children }) => (
  <div className={`flash flash-full${type ? `flash-${type}` : null}`}>
    {children}
  </div>
);

Flash.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};

export default Flash;
