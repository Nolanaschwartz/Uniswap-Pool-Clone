import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tr,
  Container,
  HStack,
  Button,
} from "@chakra-ui/react";
import usePool from "../../hooks/usePool";
import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { formatUSD } from "../../util/util";

const PoolTable = () => {
  const { loading, error, state, incrementPage, decrementPage } = usePool();
  const [body, setBody] = useState<any>(undefined);

  useEffect(() => {
    if (state.transactions) {
      setBody(
        state.transactions.map((transaction) => {
          return (
            <Tr>
              <Td maxW={"40ch"}>
                <Link
                  style={{ textOverflow: "ellipsis" }}
                  target={"_blank"}
                  href={`https://etherscan.io/tx/${transaction.id}`}
                >
                  <Text
                    noOfLines={1}
                    textOverflow={"ellipsis"}
                  >{`https://etherscan.io/tx/${transaction.id}`}</Text>
                </Link>
              </Td>
              <Td>{transaction.__typename}</Td>
              <Td>{formatUSD(transaction.amountUSD)}</Td>
              <Td>{moment.unix(parseInt(transaction.timestamp)).fromNow()}</Td>
            </Tr>
          );
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
            <Th>Link to Etherscan</Th>
            <Th>TX Type</Th>
            <Th>Token Amount (USD)</Th>
            <Th>Timestamp</Th>
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
