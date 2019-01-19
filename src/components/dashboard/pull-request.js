import React from "react";
import { formatDistance } from "date-fns";

const PR_STATE_CLASSES = {
  "review requested": "bg-blue text-white",
  "changes requested": "Label--orange",
  approved: "bg-green text-white",
  commented: "Label--gray",
  pending: "Label--gray",
  dismissed: "bg-red text-white"
};

const PullRequest = ({
  number,
  title,
  url,
  createdAt,
  author,
  repository,
  reviewState
}) => {
  const now = new Date();
  const relativeTime = field => formatDistance(field, now, { addSuffix: true });

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
      <div className="flex-auto">
        <a href={repository.url} className="muted-link h4 pr-1">
          {repository.nameWithOwner}
        </a>
        <a href={url} className="link-gray-dark no-underline h4">
          {title}
        </a>
        <div className="text-gray">
          #{number} opened{" "}
          <span title={createdAt}>{relativeTime(createdAt)}</span> by{" "}
          <a href={author.url} className="muted-link">
            {author.login}
          </a>
          {reviewState ? (
            <span className={`Label ml-2 ${PR_STATE_CLASSES[reviewState]}`}>
              {reviewState}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PullRequest;
