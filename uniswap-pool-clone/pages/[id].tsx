import usePool, { PoolProvider } from "../hooks/usePool";
import PoolContainer from "../components/Pool/PoolContainer";
import Link from "next/link";
import { Button, GridItem, Heading, HStack } from "@chakra-ui/react";
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
        <HStack width="100%">
          <Link href="/">Back to Pools</Link>
        </HStack>
      </GridItem>
      <GridItem w="100%" colSpan={12}>
        <Heading
          as="h1"
          size="lg"
        >{`${data?.pool.token0.symbol}/${data?.pool.token1.symbol}`}</Heading>
        <Button
          onClick={() => {
            isWatched ? removePool(data?.pool.id) : addPool(data?.pool.id);
          }}
        >
          {isWatched ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
      </GridItem>
      <GridItem colSpan={4} border="2px solid #000" borderRadius={"4px"}>
        <DetailCard />
      </GridItem>
      <GridItem
        colSpan={12}
        border="2px solid #000"
        borderRadius={"4px"}
        padding={"8px"}
      >
        <PoolContainer />
      </GridItem>
    </PoolProvider>
  );
};

export default PoolPage;
