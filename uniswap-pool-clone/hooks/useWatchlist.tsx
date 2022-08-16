import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useQuery } from "@apollo/client";
import watchpools from "../gql/watchpools.gql";
import { watchedPools } from "../db/watchedPools";

interface IWatchlistQueryParams {
  page: number;
  watched?: {};
}
interface IQueryContext {
  state: IWatchlistQueryParams;
  dispatch: Dispatch<QueryAction>;
}

type QueryAction =
  | { type: "SET_POOLS"; watchedPools: { [key: string]: string } }
  | { type: "ADD_POOL"; id: string }
  | { type: "REMOVE_POOL"; id: string }
  | { type: "INCREMENT_PAGE" }
  | {
      type: "DECREMENT_PAGE";
    }
  | { type: "SET_PAGE"; page: number };

const queryReducer: Reducer<IWatchlistQueryParams, QueryAction> = (
  state: IWatchlistQueryParams,
  action: QueryAction
) => {
  switch (action.type) {
    case "SET_POOLS":
      return { ...state, watched: action.watchedPools };

    case "ADD_POOL":
      return {
        ...state,
        watched: { ...state.watched, [action.id]: action.id },
      };
    case "REMOVE_POOL":
      delete state.watched[action.id];
      return {
        ...state,
        watched: state.watched,
      };
    case "INCREMENT_PAGE":
      return { page: state.page + 1 };
    case "DECREMENT_PAGE":
      return { page: state.page === 0 ? 0 : state.page - 1 };
    case "SET_PAGE":
      return { page: action.page };
    default:
      return state;
  }
};

const defaultQueryParams: IWatchlistQueryParams = {
  page: 0,
  watched: {},
};

const WatchlistContext = createContext<IQueryContext>({
  state: defaultQueryParams,
  dispatch: () => undefined,
});

export const WatchlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queryReducer, defaultQueryParams);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

const useWatchlist = () => {
  const { state, dispatch } = useContext(WatchlistContext);
  const { loading, error, data } = useQuery(watchpools, {
    variables: {
      skip: 10 * state.page || 0,
      limit: 10,
    },
    skip: !state.watched,
  });

  useEffect(() => {
    const hydrateState = async () => {
      const pools = await watchedPools.pools.limit(10).toArray();
      const poolDict = pools.reduce((acc, pool) => {
        acc[pool.id] = pool.id;
        return acc;
      }, {});
      await dispatch({ type: "SET_POOLS", watchedPools: poolDict });
    };
    hydrateState();
  }, []);

  const addPool = (id: string) => {
    watchedPools.addPool(id);
    dispatch({ type: "ADD_POOL", id });
  };

  const removePool = (id: string) => {
    watchedPools.removePool(id);
    dispatch({ type: "REMOVE_POOL", id });
    console.log("deleted");
  };

  const incrementPage = () => dispatch({ type: "INCREMENT_PAGE" });
  const decrementPage = () => dispatch({ type: "DECREMENT_PAGE" });

  return {
    loading,
    error,
    data,
    incrementPage,
    decrementPage,
    addPool,
    removePool,
    state,
  };
};

export default useWatchlist;
