import usePool, { PoolProvider } from "../hooks/usePool";
import PoolContainer from "../components/Pool/PoolContainer";
import Link from "next/link";
import { GridItem, Heading, HStack } from "@chakra-ui/react";
import DetailCard from "../components/Pool/DetailCard";

const PoolPage = () => {
  const { data } = usePool();
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
        >{`${data.pool.token0.symbol}/${data.pool.token1.symbol}`}</Heading>
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
