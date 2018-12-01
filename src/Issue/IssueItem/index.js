import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

dayjs.extend(relativeTime);

const IssueItem = ({ issue }) => (
  <li className="IssueItem">
    <h5>
      <a href={issue.url}>{issue.title}</a>
    </h5>
    <p>
      {issue.author && (
        <span>
          Opened by <a href={issue.author.url}>{issue.author.login}</a>
        </span>
      )}
      {issue.createdAt && (
        <span title={issue.createdAt}> {dayjs(issue.createdAt).fromNow()}</span>
      )}
    </p>
  </li>
);

export default IssueItem;
