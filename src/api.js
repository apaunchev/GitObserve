import axios from "axios";
import { GITHUB_GRAPHQL_API } from "./consts";

export const makeAPICall = (query, token) => {
  return axios
    .post(
      GITHUB_GRAPHQL_API,
      { query },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => response)
    .catch(error => console.error(`Error while fetching data: ${error}`));
};
