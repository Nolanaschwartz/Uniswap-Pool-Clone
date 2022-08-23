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
import pool from "../gql/pool.gql";
import { useRouter } from "next/router";

export enum TransactionType {
  "SWAPS",
  "BURNS",
  "MINTS",
  "ALL",
}

interface IPoolQueryParams {
  page: number;
  id?: string;
  type: TransactionType;
  transactions: any;
}
interface IPoolQueryContext {
  state: IPoolQueryParams;
  dispatch: Dispatch<PoolQueryAction>;
}

type PoolQueryAction =
  | { type: "SET_FILTER"; transactionType: TransactionType }
  | { type: "INCREMENT_PAGE" }
  | { type: "DECREMENT_PAGE" }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_HISTORY"; transactions };

const queryReducer: Reducer<IPoolQueryParams, PoolQueryAction> = (
  state: IPoolQueryParams,
  action: PoolQueryAction
) => {
  switch (action.type) {
    case "SET_HISTORY":
      return { ...state, transactions: action.transactions };
    case "SET_FILTER":
      return { ...state, type: action.transactionType };
    case "INCREMENT_PAGE":
      return { ...state, page: state.page + 1 };
    case "DECREMENT_PAGE":
      return { ...state, page: state.page === 0 ? 0 : state.page - 1 };
    case "SET_PAGE":
      return { ...state, page: action.page };
    default:
      return state;
  }
};

const defaultQueryParams: IPoolQueryParams = {
  page: 0,
  type: TransactionType.ALL,
  transactions: [],
};

const PoolContext = createContext<IPoolQueryContext>({
  state: defaultQueryParams,
  dispatch: () => undefined,
});

export const PoolProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queryReducer, defaultQueryParams);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

const usePool = () => {
  const { state, dispatch } = useContext(PoolContext);
  const router = useRouter();
  const { id } = router.query;
  const { startPolling, data, loading, error } = useQuery(pool, {
    variables: {
      pool: id,
      swaps:
        state.type === TransactionType.SWAPS ||
        state.type === TransactionType.ALL,
      burns:
        state.type === TransactionType.BURNS ||
        state.type === TransactionType.ALL,
      mints:
        state.type === TransactionType.MINTS ||
        state.type === TransactionType.ALL,
      skip: 10 * state.page || 0,
      limit: 10,
    },
    ssr: false,
    pollInterval: 5000
  });

  startPolling(5000)

  useEffect(() => {
    if (data?.pool) {
      const transactions = [
        ...(data?.pool?.mints || []),
        ...(data?.pool?.swaps || []),
        ...(data?.pool?.burns || []),
      ].sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
      if (transactions.length < 1) {
        dispatch({ type: "DECREMENT_PAGE" });
      } else {
        dispatch({ type: "SET_HISTORY", transactions });
      }
    }
  }, [data]);

  const incrementPage = () => dispatch({ type: "INCREMENT_PAGE" });
  const decrementPage = () => dispatch({ type: "DECREMENT_PAGE" });
  const setFilter = (type: TransactionType) =>
    dispatch({ type: "SET_FILTER", transactionType: type });

  return {
    loading,
    error,
    data,
    incrementPage,
    decrementPage,
    setFilter,
    state,
  };
};

export default usePool;
