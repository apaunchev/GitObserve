import React from "react";
import { formatDistance } from "date-fns";

const PullRequest = ({ number, title, url, createdAt, updatedAt, author }) => (
  <div className="PullRequest">
    <ul className="PullRequestInfo">
      {author.avatarUrl && (
        <li>
          <img src={author.avatarUrl} alt="" />
        </li>
      )}
      <li>
        <a href={url}>{title}</a> (#{number})
      </li>
      <li>
        Opened by <a href={author.url}>{author.login}</a>{" "}
        <i title={createdAt}>{formatDistance(createdAt, new Date())} ago</i>
      </li>
      <li>
        <span title={updatedAt}>{formatDistance(updatedAt, new Date())}</span>
      </li>
    </ul>
  </div>
);

export default PullRequest;
