import {
  Button,
  Container,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import usePools from "../hooks/usePools";
import { useEffect, useState } from "react";
import { formatUSD } from "../util/util";

const PoolsTable = () => {
  const router = useRouter();
  const [body, setBody] = useState<any>(undefined);
  const { data, loading, error, incrementPage, decrementPage } = usePools();

  useEffect(() => {
    if (data?.pools) {
      setBody(
        data?.pools.map((pool: any) => (
          <Tr
            onClick={() => router.push(`/${pool.id}`)}
            style={{ cursor: "pointer" }}
            key={pool.id}
          >
            <Td>{`${pool.token0.symbol}/${pool.token1.symbol}`}</Td>
            <Td>{pool.txCount}</Td>
            <Td>{formatUSD(pool.totalValueLockedUSD)}</Td>
            <Td>{formatUSD(pool.volumeUSD)}</Td>
          </Tr>
        ))
      );
    } else if (error) {
      setBody(<div>{error.name}</div>);
    }
  }, [data, error]);

  return (
    <TableContainer width={"100%"}>
      <Table
        variant="simple"
        size="lg"
        style={loading ? { background: "rgba(0, 0, 0, 0.1)" } : {}}
      >
        <Thead>
          <Tr>
            <Th>Pair</Th>
            <Th>TX Count</Th>
            <Th>TVL (USD)</Th>
            <Th>Volume (USD)</Th>
          </Tr>
        </Thead>
        <Tbody>{body}</Tbody>
      </Table>

      <Container centerContent={true} width="100%" marginTop={"8px"}>
        <HStack>
          <Button onClick={decrementPage}>Prev</Button>
          <Button onClick={incrementPage}>Next</Button>
        </HStack>
      </Container>
    </TableContainer>
  );
};

export default PoolsTable;
