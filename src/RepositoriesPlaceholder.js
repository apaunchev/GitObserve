import React from "react";

const RepositoriesPlaceholder = () => (
  <ol className="Repositories">
    {Array(5)
      .fill("")
      .map((line, index) => (
        <li key={index} className="Repository Repository-placeholder">
          <div className="Repository-placeholder-name" />
          <div className="Repository-placeholder-text" />
          <div className="Repository-placeholder-text" />
        </li>
      ))}
  </ol>
);

export default RepositoriesPlaceholder;
