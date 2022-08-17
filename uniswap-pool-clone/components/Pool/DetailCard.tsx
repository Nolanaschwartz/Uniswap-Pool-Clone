import usePool from "../../hooks/usePool";
import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { formatUSD } from "../../util/util";
import { useQuery } from "@apollo/client";
import ETHPrice from "../../gql/ETHPrice.gql";

const DetailCard = () => {
  const { data } = usePool();
  const { data: ETHData } = useQuery(ETHPrice);
  if (!data || !ETHData) {
    return undefined;
  }
  const { ethPriceUSD } = ETHData.bundle;

  return (
    <GridItem colSpan={4} padding={"8px"}>
      <Grid templateColumns="repeat(12, 1fr)" gap={1}>
        <GridItem colSpan={9}>
          <Heading as="h3" size="md">
            Tokens Value (USD)
          </Heading>
          <Text>{`${data?.pool?.token0.symbol}: ${formatUSD(
            data?.pool?.token0.derivedETH * ethPriceUSD
          )}`}</Text>
          <Text>{`${data?.pool?.token1.symbol}: ${formatUSD(
            data?.pool?.token1.derivedETH * ethPriceUSD
          )}`}</Text>
        </GridItem>
        <GridItem colSpan={3}>
          <Heading as="h3" size="md">
            TX Count
          </Heading>
          <Text>{data?.pool?.txCount}</Text>
        </GridItem>
      </Grid>
    </GridItem>
  );
};

export default DetailCard;
