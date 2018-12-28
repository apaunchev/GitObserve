import React from "react";
import { formatDistance, differenceInDays } from "date-fns";

const STALENESS = {
  FRESH: {
    label: "Fresh",
    classNames: "bg-green"
  },
  STALE: {
    label: "Stale",
    classNames: "bg-purple"
  }
};

const getStaleness = date => {
  const difference = differenceInDays(new Date(date), new Date());
  if (difference >= -7) {
    return STALENESS.FRESH;
  }
  if (difference <= -30) {
    return STALENESS.STALE;
  }
  return undefined;
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
  const staleness = getStaleness(updatedAt);

  return (
    <div className="Box-row Box-row--hover-gray d-flex">
      {author.avatarUrl && (
        <div>
          <img
            className="avatar"
            src={author.avatarUrl}
            width="48"
            height="48"
            alt=""
          />
        </div>
      )}
      <div className="flex-auto px-3">
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
          {staleness ? (
            <span
              className={`d-inline-block ml-2 label box-shadow-none text-normal rounded-1 f6 tooltipped tooltipped-sw ${
                staleness.classNames
              }`}
              aria-label={`Last updated ${formatDistance(updatedAt, now)} ago`}
            >
              {staleness.label}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PullRequest;
