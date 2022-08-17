import { HStack, Td, Tr, Text, Image } from "@chakra-ui/react";
import { formatUSD, tokenImageFetcher } from "../../util/util";
import { useRouter } from "next/router";
import useSWR from "swr";

export interface IPoolsBodyRowProps {
  pool: any;
}

const PoolsBodyRow = ({ pool }: IPoolsBodyRowProps) => {
  const router = useRouter();

  const { data: token0ImageURL } = useSWR(pool.token0.id, tokenImageFetcher);
  const { data: token1ImageURL } = useSWR(pool.token1.id, tokenImageFetcher);

  return (
    <Tr
      onClick={() => router.push(`/${pool.id}`)}
      style={{ cursor: "pointer" }}
      key={pool.id}
    >
      <Td w="50%">
        <HStack>
          <Image
            src={token0ImageURL}
            h="24px"
            w="24px"
            borderRadius="12px"
            border="2px solid black"
          />
          <Image
            src={token1ImageURL}
            h="24px"
            w="24px"
            borderRadius="12px"
            border="2px solid black"
            marginLeft="-10px !important"
          />

          <Text>{`${pool.token0.symbol}/${pool.token1.symbol}`}</Text>
        </HStack>
      </Td>
      <Td textAlign="center">{pool.txCount}</Td>
      <Td textAlign="center">{formatUSD(pool.totalValueLockedUSD)}</Td>
      <Td textAlign="center">{formatUSD(pool.volumeUSD)}</Td>
    </Tr>
  );
};

export default PoolsBodyRow;
