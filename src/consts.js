export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
export const AUTH_API_URI = process.env.REACT_APP_AUTH_API_URI;

export const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
export const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  READY: "ready"
};

export const LOCAL_STORAGE_KEY = {
  GITHUB_TOKEN: "github_token"
};
