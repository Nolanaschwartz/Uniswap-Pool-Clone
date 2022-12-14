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
import PoolsBodyRow from "./PoolsBodyRow";

export interface IPoolsTableProps {
  title: string;
  pools?: any;
  loading: boolean;
  error?: any;
  incrementPage?: () => void;
  decrementPage?: () => void;
  isWatchlist?: boolean;
}

const PoolsTable = ({
  title,
  pools,
  loading,
  error,
  incrementPage,
  decrementPage,
  isWatchlist,
}: IPoolsTableProps) => {
  const [body, setBody] = useState<any>(undefined);

  useEffect(() => {
    if (pools) {
      setBody(
        pools.map((pool: any) => (
          <PoolsBodyRow pool={pool} key={pool.id} isWatchlist={isWatchlist} />
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
              <Th w="50%">Pair</Th>
              <Th textAlign="center">TX Count</Th>
              <Th textAlign="center">TVL (USD)</Th>
              <Th textAlign="center">Volume (USD)</Th>
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
