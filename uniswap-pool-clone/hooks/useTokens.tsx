import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { useQuery } from "@apollo/client";
import tokens from "../gql/tokens.gql";

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

const TokensContext = createContext<IQueryContext>({
  state: defaultQueryParams,
  dispatch: () => undefined,
});

export const TokensProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queryReducer, defaultQueryParams);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <TokensContext.Provider value={value}>{children}</TokensContext.Provider>
  );
};

const useTokens = () => {
  const { state, dispatch } = useContext(TokensContext);

  const { loading, error, data } = useQuery(tokens, {
    variables: {
      skip: 10 * state.page || 0,
      limit: 10,
    },
  });

  const incrementPage = () => dispatch({ type: "INCREMENT_PAGE" });
  const decrementPage = () => dispatch({ type: "DECREMENT_PAGE" });

  return { loading, error, data, incrementPage, decrementPage, state };
};

export default useTokens;
