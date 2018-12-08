import React from "react";

const scopes = ["read:org", "repo"];
const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const githubUrl = process.env.REACT_APP_GITHUB_AUTH_URI;
const redirectUrl = process.env.REACT_APP_GITHUB_REDIRECT_URI;
const authUrl = `${githubUrl}?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUrl}`;

const Login = () => <a href={authUrl}>Login</a>;

export default Login;
