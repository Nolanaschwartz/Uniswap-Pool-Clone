import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Container,
  HStack,
  Button,
} from "@chakra-ui/react";
import usePool from "../../hooks/usePool";
import { useEffect, useState } from "react";
import PoolBodyRow from "./PoolBodyRow";

const PoolTable = () => {
  const { loading, error, state, incrementPage, decrementPage } = usePool();
  const [body, setBody] = useState<any>(undefined);

  useEffect(() => {
    if (state.transactions) {
      setBody(
        state.transactions.map((transaction) => {
          return <PoolBodyRow transaction={transaction} key={transaction.id} />;
        })
      );
    }
  }, [state.transactions, error]);

  return (
    <TableContainer w="100%">
      <Table
        variant="simple"
        size="lg"
        style={loading ? { background: "rgba(0, 0, 0, 0.1)" } : {}}
      >
        <Thead>
          <Tr>
            <Th w="50%">Link to Etherscan</Th>
            <Th textAlign="center">TX Type</Th>
            <Th textAlign="center">Token Amount (USD)</Th>
            <Th textAlign="center">Timestamp</Th>
          </Tr>
        </Thead>
        <Tbody>{body}</Tbody>
      </Table>
      <Container centerContent={true} width="100%" marginTop={"8px"}>
        <HStack>
          <Button disabled={loading} onClick={decrementPage}>
            Prev
          </Button>
          <Button
            disabled={loading || state.transactions < 10}
            onClick={incrementPage}
          >
            Next
          </Button>
        </HStack>
      </Container>
    </TableContainer>
  );
};

export default PoolTable;
