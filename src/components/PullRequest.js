import React from "react";
import { formatDistance, differenceInDays } from "date-fns";

const PR_STATUS = {
  FRESH: "bg-green",
  STALE: "bg-blue",
  ROTTEN: "bg-purple"
};

const getPRStatus = date => {
  const difference = differenceInDays(new Date(date), new Date());

  if (difference > -7) {
    return PR_STATUS.FRESH;
  }

  if (difference <= -7 && difference >= -28) {
    return PR_STATUS.STALE;
  }

  if (difference < -28) {
    return PR_STATUS.ROTTEN;
  }

  return null;
};

const PullRequest = ({
  number,
  title,
  url,
  createdAt,
  updatedAt,
  author,
  repository
}) => {
  const now = new Date();

  return (
    <div className="Box-row Box-row--hover-gray d-flex">
      {author.avatarUrl && (
        <div className="pr-3">
          <img
            className="avatar"
            src={author.avatarUrl}
            width="48"
            height="48"
            alt=""
          />
        </div>
      )}
      <div className="flex-auto pr-3">
        <a href={repository.url} className="muted-link h4 pr-1">
          {repository.nameWithOwner}
        </a>
        <a href={url} className="link-gray-dark no-underline h4">
          {title}
        </a>
        <div className="text-gray">
          #{number} opened{" "}
          <span title={createdAt}>{formatDistance(createdAt, now)} ago</span> by{" "}
          <a href={author.url} className="muted-link">
            {author.login}
          </a>
        </div>
      </div>
      <div className="d-flex flex-items-center">
        <span
          className={`d-inline-block px-3 py-1 rounded-1 text-white no-wrap tooltipped tooltipped-s ${getPRStatus(
            updatedAt
          )}`}
          aria-label={`Last updated ${formatDistance(updatedAt, now)} ago`}
        >
          {formatDistance(updatedAt, now)} ago
        </span>
      </div>
    </div>
  );
};

export default PullRequest;
