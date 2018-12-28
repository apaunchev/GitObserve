import React from "react";
import { formatDistance, differenceInDays } from "date-fns";

const STALENESS_CLASS = {
  FRESH: "bg-green",
  NEUTRAL: "bg-blue",
  STALE: "bg-purple"
};

const getStalenessClass = date => {
  const difference = differenceInDays(new Date(date), new Date());
  if (difference >= -7) {
    return STALENESS_CLASS.FRESH;
  }
  if (difference < -7 && difference >= -30) {
    return STALENESS_CLASS.NEUTRAL;
  }
  if (difference < -30) {
    return STALENESS_CLASS.STALE;
  }
};

const PullRequest = ({
  number,
  title,
  url,
  createdAt,
  updatedAt,
  author,
  repository
}) => (
  <li className="PullRequest Box-row d-flex">
    {author.avatarUrl && (
      <div>
        <img
          className="avatar"
          src={author.avatarUrl}
          width="64"
          height="64"
          alt=""
        />
      </div>
    )}
    <div className="flex-auto px-3">
      <div>
        <a href={url}>{title}</a> (#{number})
      </div>
      <div>
        <a href={repository.url}>{repository.nameWithOwner}</a>
      </div>
      <div>
        Opened by <a href={author.url}>{author.login}</a>{" "}
        <span title={createdAt}>
          {formatDistance(createdAt, new Date())} ago
        </span>
      </div>
    </div>
    <div className="flex-self-center">
      <span
        className={`text-white p-2 rounded-1 no-wrap ${getStalenessClass(
          updatedAt
        )}`}
        title={updatedAt}
      >
        {formatDistance(updatedAt, new Date())}
      </span>
    </div>
  </li>
);

export default PullRequest;
