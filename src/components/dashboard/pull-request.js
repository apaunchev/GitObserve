import React from "react";
import { connect } from "react-redux";
import { formatDistance, differenceInDays } from "date-fns";
import { PR_STALENESS } from "../../constants";

const getPRStaleness = date => {
  const difference = differenceInDays(new Date(date), new Date());

  if (difference > -7) {
    return PR_STALENESS.FRESH;
  }

  if (difference < -28) {
    return PR_STALENESS.STALE;
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
  repository,
  stalenessLabelsEnabled
}) => {
  const now = new Date();
  const relativeTime = field =>
    formatDistance(field, now, {
      addSuffix: true
    });
  const status = getPRStaleness(updatedAt);

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
          <span title={createdAt}>{relativeTime(createdAt)}</span> by{" "}
          <a href={author.url} className="muted-link">
            {author.login}
          </a>
          {stalenessLabelsEnabled && status && (
            <span
              className="Label Label--outline ml-1 tooltipped tooltipped-sw"
              aria-label={`Last updated ${relativeTime(updatedAt)}`}
              style={{ color: status.color, borderColor: status.color }}
            >
              {status.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  stalenessLabelsEnabled: state.settings.stalenessLabelsEnabled
});

export default connect(mapStateToProps)(PullRequest);
