import React, { Component } from "react";

import { LOCAL_STORAGE_KEY } from "../consts";
import { GET_AVATAR } from "./queries";
import { makeAPICall } from "../api";

import "./style.css";

class Avatar extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.GITHUB_TOKEN);
    if (storedToken) {
      this.getAvatar(storedToken);
    }
  }

  getAvatar(token) {
    makeAPICall(GET_AVATAR, token).then(response => this.setState({ data: response.data.data }));
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return <img className="Avatar" src="avatar.png" width={32} height={32} alt="Avatar" />;
    }

    return (
      <img className="Avatar" src={data.viewer.avatarUrl} width={32} height={32} alt="Avatar" />
    );
  }
}

export default Avatar;
