import {
  Button,
  Container,
  Heading,
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
import { useEffect, useState } from "react";
import { formatUSD } from "../../util/util";

export interface IPoolsTableProps {
  title: string;
  pools?: any;
  loading: boolean;
  error?: any;
  incrementPage?: () => void;
  decrementPage?: () => void;
}

const PoolsTable = ({
  title,
  pools,
  loading,
  error,
  incrementPage,
  decrementPage,
}: IPoolsTableProps) => {
  const router = useRouter();
  const [body, setBody] = useState<any>(undefined);

  useEffect(() => {
    if (pools) {
      setBody(
        pools.map((pool: any) => (
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
  }, [pools, error]);

  return (
    <>
      <Heading as="h2" size="lg">
        {title}
      </Heading>
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

        {decrementPage && incrementPage && (
          <Container centerContent={true} width="100%" marginTop={"8px"}>
            <HStack>
              <Button onClick={decrementPage}>Prev</Button>
              <Button onClick={incrementPage}>Next</Button>
            </HStack>
          </Container>
        )}
      </TableContainer>
    </>
  );
};

export default PoolsTable;
