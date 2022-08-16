import type { NextPage } from "next";
import { GridItem } from "@chakra-ui/react";

import AllPoolsContainer from "../components/Pools/AllPoolsContainer";
import WatchlistContainer from "../components/Pools/WatchlistContainer";
import useWatchlist from "../hooks/useWatchlist";

const Home: NextPage = () => {
  const { state } = useWatchlist();
  return (
    <GridItem w="100%" colSpan={12}>
      {Object.keys(state.watched).length !== 0 && <WatchlistContainer />}
      <AllPoolsContainer />
    </GridItem>
  );
};

export default Home;
