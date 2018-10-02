import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

import "./style.css";

dayjs.extend(relativeTime);

const RepositoryItem = ({ id, name, owner, pushedAt, url, descriptionHTML }) => (
  <>
    <h3>
      <a href={url}>{name}</a>
    </h3>
    <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
    <p>
      {pushedAt && (
        <span>
          Updated <span title={pushedAt}>{dayjs(pushedAt).fromNow()}</span>
        </span>
      )}
    </p>
  </>
);

export default RepositoryItem;
