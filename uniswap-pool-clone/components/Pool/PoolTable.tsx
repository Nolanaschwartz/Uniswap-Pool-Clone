import {
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
  Box,
} from "@chakra-ui/react";
import usePool from "../../hooks/usePool";
import { useEffect, useState } from "react";
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
              <Td w="50%">
                <Box maxW="40ch" textOverflow="ellipsis">
                  <a
                    style={{ cursor: "pointer" }}
                    target={"_blank"}
                    href={`https://etherscan.io/tx/${transaction.id}`}
                  >
                    <Text
                      noOfLines={1}
                      textOverflow={"ellipsis"}
                    >{`https://etherscan.io/tx/${transaction.id}`}</Text>
                  </a>
                </Box>
              </Td>
              <Td textAlign="center">{transaction.__typename}</Td>
              <Td textAlign="center">{formatUSD(transaction.amountUSD)}</Td>
              <Td textAlign="center">
                {moment.unix(parseInt(transaction.timestamp)).fromNow()}
              </Td>
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
