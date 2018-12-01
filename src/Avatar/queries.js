import gql from "graphql-tag";

export const GET_AVATAR = gql`
  query {
    viewer {
      avatarUrl
    }
  }
`;
