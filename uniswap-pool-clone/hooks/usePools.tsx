import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { useQuery } from "@apollo/client";
import pools from "../gql/pools.gql";

interface IQueryParams {
  page: number;
}
interface IQueryContext {
  state: IQueryParams;
  dispatch: Dispatch<QueryAction>;
}

type QueryAction =
  | { type: "INCREMENT_PAGE" }
  | {
      type: "DECREMENT_PAGE";
    }
  | { type: "SET_PAGE"; page: number };

const queryReducer: Reducer<IQueryParams, QueryAction> = (
  state: IQueryParams,
  action: QueryAction
) => {
  switch (action.type) {
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

const defaultQueryParams: IQueryParams = {
  page: 0,
};

const PoolsContext = createContext<IQueryContext>({
  state: defaultQueryParams,
  dispatch: () => undefined,
});

export const PoolsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queryReducer, defaultQueryParams);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <PoolsContext.Provider value={value}>{children}</PoolsContext.Provider>
  );
};

const usePools = () => {
  const { state, dispatch } = useContext(PoolsContext);

  const { loading, error, data } = useQuery(pools, {
    variables: {
      skip: 10 * state.page || 0,
      limit: 10,
    },
  });

  const incrementPage = () => dispatch({ type: "INCREMENT_PAGE" });
  const decrementPage = () => dispatch({ type: "DECREMENT_PAGE" });

  return { loading, error, data, incrementPage, decrementPage, state };
};

export default usePools;
