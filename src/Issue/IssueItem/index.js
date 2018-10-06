import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

dayjs.extend(relativeTime);

const IssueItem = ({ url, title, author, createdAt }) => (
  <>
    <h5>
      <a href={url}>{title}</a>
    </h5>
    <p>
      {author && (
        <span>
          Opened by <a href={author.url}>{author.login}</a>
        </span>
      )}
      {createdAt && <span title={createdAt}> {dayjs(createdAt).fromNow()}</span>}
    </p>
  </>
);

export default IssueItem;
