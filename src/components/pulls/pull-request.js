import Octicon, {
  Clock as ClockIcon,
  Organization as OrganizationIcon
} from "@githubprimer/octicons-react";
import { isoToRelative } from "../../utils";
import React from "react";
import { connect } from "react-redux";

const PR_STATE_CLASSES = {
  "review requested": "bg-blue text-white",
  "changes requested": "Label--orange",
  approved: "bg-green text-white",
  commented: "bg-yellow text-gray",
  pending: "Label--gray",
  dismissed: "bg-red text-white",
  "no request": "Label--gray"
};

const PullRequest = ({
  title,
  url,
  createdAt,
  updatedAt,
  author,
  assignees,
  repository,
  reviewCount,
  reviewState,
  reviewedAt,
  isNew,
  filters
}) => {
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
          <span>
            <Octicon icon={ClockIcon} />{" "}
            {filters && filters.orderBy === "updatedAt" && updatedAt ? (
              <span>
                Updated{" "}
                <span title={updatedAt}>{isoToRelative(updatedAt)}</span>
              </span>
            ) : filters && filters.orderBy === "createdAt" && createdAt ? (
              <span>
                Created{" "}
                <span title={createdAt}>{isoToRelative(createdAt)}</span>
              </span>
            ) : filters && filters.orderBy === "reviewedAt" && reviewedAt ? (
              <span>
                Reviewed{" "}
                <span title={reviewedAt}>{isoToRelative(reviewedAt)}</span>
              </span>
            ) : null}
          </span>
          {reviewCount > 0 ? (
            <span className="ml-2">
              <Octicon icon={OrganizationIcon} /> {reviewCount}{" "}
              {reviewCount === 1 ? "review" : "reviews"}
            </span>
          ) : null}
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
  filters: state.pulls.filters
});

export default connect(mapStateToProps)(PullRequest);
