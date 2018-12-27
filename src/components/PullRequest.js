import React from "react";
import { formatDistance } from "date-fns";

const PullRequest = ({
  number,
  title,
  url,
  createdAt,
  updatedAt,
  author,
  repository
}) => (
  <div className="PullRequest">
    <ul className="PullRequestInfo">
      {author.avatarUrl && (
        <li>
          <a href={author.url}>
            <img src={author.avatarUrl} alt="" />
          </a>
        </li>
      )}
      <li>
        <a href={url}>{title}</a> (#{number})
      </li>
      <li>
        <a href={repository.url}>{repository.nameWithOwner}</a>
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
