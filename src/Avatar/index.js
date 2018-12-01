import React from "react";
import { Query } from "react-apollo";

import { GET_AVATAR } from "./queries";

import "./style.css";

const Avatar = () => (
  <Query query={GET_AVATAR}>
    {({ data }) => {
      return data && data.viewer ? (
        <img
          className="Avatar"
          src={data.viewer.avatarUrl}
          width={32}
          height={32}
          alt="Avatar"
        />
      ) : (
        <img
          className="Avatar"
          src="avatar.png"
          width={32}
          height={32}
          alt="Avatar"
        />
      );
    }}
  </Query>
);

export default Avatar;
