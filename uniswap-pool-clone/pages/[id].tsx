import usePool, { PoolProvider } from "../hooks/usePool";
import PoolContainer from "../components/Pool/PoolContainer";
import Link from "next/link";
import {
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import DetailCard from "../components/Pool/DetailCard";
import useWatchlist from "../hooks/useWatchlist";
import { useEffect, useState } from "react";

const PoolPage = () => {
  const { addPool, removePool, state } = useWatchlist();
  const { data } = usePool();
  const [isWatched, setIsWatched] = useState(!!state.watched[data?.pool.id]);

  useEffect(() => {
    console.log(state?.watched);
    if (data?.pool && state?.watched) {
      console.log("useEffect");
      setIsWatched(!!state.watched[data?.pool.id]);
    }
  }, [data?.pool, state?.watched[data?.pool.id]]);

  return (
    <PoolProvider>
      <GridItem w="100%" colSpan={12}>
        <Link href="/">Back to Pools</Link>
      </GridItem>
      <GridItem w="100%" colSpan={12}>
        <Grid templateColumns="repeat(12, 1fr)" gap={12}>
          <GridItem colSpan={4}>
            <Heading as="h1" size="lg">{`${data?.pool.token0.symbol || ""}/${
              data?.pool.token1.symbol || ""
            }`}</Heading>
          </GridItem>
          <GridItem colSpan={4} />
          <GridItem colSpan={4} justifySelf={"flex-end"}>
            <Button
              size="lg"
              onClick={() => {
                isWatched ? removePool(data?.pool.id) : addPool(data?.pool.id);
              }}
            >
              {isWatched ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem colSpan={4} border="2px solid #000" borderRadius={"4px"}>
        <DetailCard />
      </GridItem>
      <GridItem colSpan={12}>
        <PoolContainer />
      </GridItem>
    </PoolProvider>
  );
};

export default PoolPage;
