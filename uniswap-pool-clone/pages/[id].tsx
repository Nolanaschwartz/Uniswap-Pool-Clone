import usePool, { PoolProvider } from "../hooks/usePool";
import PoolContainer from "../components/Pool/PoolContainer";
import Link from "next/link";
import {
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
} from "@chakra-ui/react";
import DetailCard from "../components/Pool/DetailCard";
import useWatchlist from "../hooks/useWatchlist";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { tokenImageFetcher } from "../util/util";

const PoolPage = () => {
  const { addPool, removePool, state } = useWatchlist();
  const { data } = usePool();
  const [isWatched, setIsWatched] = useState(!!state.watched[data?.pool.id]);

  const { data: token0ImageURL } = useSWR(
    data?.pool.token0.id,
    tokenImageFetcher
  );
  const { data: token1ImageURL } = useSWR(
    data?.pool.token1.id,
    tokenImageFetcher
  );
  useEffect(() => {
    if (data?.pool && state?.watched) {
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
            <HStack>
              <Image
                src={token0ImageURL}
                h="36px"
                w="36px"
                borderRadius="18px"
                border="2px solid black"
              />
              <Image
                src={token1ImageURL}
                h="36px"
                w="36px"
                borderRadius="18px"
                border="2px solid black"
                marginLeft="-15px !important"
              />
              <Heading as="h1" size="lg">{`${data?.pool.token0.symbol || ""}/${
                data?.pool.token1.symbol || ""
              }`}</Heading>
            </HStack>
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
