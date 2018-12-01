import React from "react";

const Loading = () => (
  <ol className="RepositoryList">
    {Array(10)
      .fill("")
      .map((item, index) => (
        <li key={index} className="RepositoryItem RepositoryItem-placeholder">
          <div className="RepositoryItem-placeholder-name" />
          <div className="RepositoryItem-placeholder-text" />
          <div className="RepositoryItem-placeholder-text" />
        </li>
      ))}
  </ol>
);

export default Loading;
