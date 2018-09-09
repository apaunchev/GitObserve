import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

dayjs.extend(relativeTime);

const Issues = ({ issues: { edges: issues, totalCount }, seeAllUrl }) => {
  if (issues.length === 0) {
    return <div className="Issues">No content.</div>;
  }

  return (
    <ol className="Issues">
      {issues.map(({ node: { id, url, title, author, createdAt } }) => (
        <li className="Issue" key={id}>
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
        </li>
      ))}
      {totalCount > 0 && (
        <li className="Issue">
          <a href={seeAllUrl} className="btn btn-outline" role="button">
            See all on GitHub
          </a>
        </li>
      )}
    </ol>
  );
};

export default Issues;
