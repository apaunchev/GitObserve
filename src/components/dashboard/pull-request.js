import { formatDistance, parseISO } from "date-fns";
import React from "react";
import { connect } from "react-redux";

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
  updatedAt,
  author,
  assignees,
  repository,
  reviewState,
  isNew,
  filters
}) => {
  const relativeTime = field =>
    formatDistance(parseISO(field), new Date(), { addSuffix: true });
  let className = "Box-row Box-row--hover-gray d-flex";
  if (isNew) className += " Box-row--unread";

  return (
    <div className={className}>
      {author.avatarUrl && (
        <div className="pr-3">
          <a
            href={author.url}
            className="d-block tooltipped tooltipped-se"
            aria-label={`Opened by ${author.login}`}
          >
            <img
              className="avatar rounded-1"
              src={author.avatarUrl}
              width="48"
              height="48"
              alt=""
            />
          </a>
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
          <span>#{number} </span>
          {filters && filters.orderBy === "updatedAt" ? (
            <span>
              updated <span title={updatedAt}>{relativeTime(updatedAt)}</span>
            </span>
          ) : (
            <span>
              opened <span title={createdAt}>{relativeTime(createdAt)}</span>
            </span>
          )}
          <span> by </span>
          <span>
            <a href={author.url} className="muted-link">
              {author.login}
            </a>
          </span>
          {reviewState ? (
            <span className={`Label ml-2 ${PR_STATE_CLASSES[reviewState]}`}>
              {reviewState}
            </span>
          ) : null}
        </div>
      </div>
      {assignees.length > 0 ? (
        <div className="pl-3">
          {assignees.map(assignee => (
            <div className="d-flex" key={assignee.login}>
              <a
                href={assignee.url}
                className="pl-1 tooltipped tooltipped-sw"
                aria-label={`Assigned to ${assignee.login}`}
              >
                <img
                  className="avatar rounded-1"
                  src={assignee.avatarUrl}
                  width="24"
                  height="24"
                  alt=""
                />
              </a>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  filters: state.dashboard.filters
});

export default connect(mapStateToProps)(PullRequest);
