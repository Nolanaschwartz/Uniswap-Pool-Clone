import useWatchlist from "../../hooks/useWatchlist";
import PoolsTable from "./PoolsTable";
import { useQuery } from "@apollo/client";
import watchpools from "../../gql/watchpools.gql";

const WatchlistContainer = () => {
  const { state } = useWatchlist();
  const { data, loading, error } = useQuery(watchpools, {
    variables: {
      // limit: 10,
      // skip: 10 * state.page || 0,
      IDS: Object.keys(state.watched),
    },
    skip: Object.keys(state.watched).length === 0,
  });
  return <PoolsTable pools={data?.pools} error={error} loading={loading} />;
};

export default WatchlistContainer;
