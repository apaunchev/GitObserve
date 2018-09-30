import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

import Issues from "./Issues";

dayjs.extend(relativeTime);

const RepositoriesList = ({ repositories }) => (
  <ol className="Repositories">
    {repositories.map(
      ({ id, url, nameWithOwner, pushedAt, descriptionHTML, issues, pullRequests }) => (
        <li key={id} className="Repository">
          <h3>
            <a href={url}>{nameWithOwner}</a>
          </h3>
          <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
          <p>
            {pushedAt && (
              <span>
                Updated <span title={pushedAt}>{dayjs(pushedAt).fromNow()}</span>
              </span>
            )}
          </p>
          <details>
            <summary>Issues ({issues.totalCount})</summary>
            <Issues issues={issues} seeAllUrl={`${url}/issues`} />
          </details>
          <details>
            <summary>Pull requests ({pullRequests.totalCount})</summary>
            <Issues issues={pullRequests} seeAllUrl={`${url}/pulls`} />
          </details>
        </li>
      )
    )}
  </ol>
);

export default RepositoriesList;
