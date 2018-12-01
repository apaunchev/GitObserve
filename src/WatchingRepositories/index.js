import React from "react";
import { Query } from "react-apollo";

import RepositoryList from "../Repository/RepositoryList";
import Loading from "../Loading";
import ErrorMessage from "../Error";

import { GET_WATCHING_REPOSITORIES } from "./queries";

const WatchingRepositories = () => (
  <Query query={GET_WATCHING_REPOSITORIES} notifyOnNetworkStatusChange={true}>
    {({ data, loading, error, fetchMore }) => {
      if (error) return <ErrorMessage error={error} />;
      if (loading && !data.viewer) return <Loading />;

      return (
        <RepositoryList
          loading={loading}
          repositories={data.viewer.watching}
          fetchMore={fetchMore}
        />
      );
    }}
  </Query>
);

export default WatchingRepositories;
