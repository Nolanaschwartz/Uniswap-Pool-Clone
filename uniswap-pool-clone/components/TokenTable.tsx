import {
  Grid,
  GridItem,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useTokens from "../hooks/useTokens";
import { useEffect, useState } from "react";

const TokenTable = () => {
  const router = useRouter();
  const [body, setBody] = useState<any>(undefined);
  const { data, loading, error, state } = useTokens();

  useEffect(() => {
    if (loading) {
      setBody(<Spinner />);
    } else if (data?.tokens) {
      setBody(
        data?.tokens.map((token: any) => (
          <Tr
            onClick={() => router.push(`/${token.id}`)}
            style={{ cursor: "pointer" }}
            key={token.id}
          >
            <Td>{token.name}</Td>
            <Td>{token.symbol}</Td>
            <Td>{parseFloat(token.volumeUSD).toFixed(2)}</Td>
            <Td>{token.txCount}</Td>
            <Td>{parseFloat(token.totalValueLockedUSD).toFixed(2)}</Td>
            <Td>{parseFloat(token.volumeUSD).toFixed(2)}</Td>
          </Tr>
        ))
      );
    } else {
      setBody(<div>{error.name}</div>);
    }
  }, [loading, data, error]);

  return (
    <TableContainer>
      <Table variant="simple" size="md" style={{tableLayout: 'fixed'}}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Symbol</Th>
            <Th>Volume</Th>
            <Th>TX Count</Th>
            <Th>TVL (USD)</Th>
            <Th>Volume (USD)</Th>
          </Tr>
        </Thead>
        <Tbody>{body}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default TokenTable;
