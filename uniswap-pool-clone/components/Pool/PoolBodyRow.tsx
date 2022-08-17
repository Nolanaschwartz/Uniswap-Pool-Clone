import { Box, Td, Text, Tr } from "@chakra-ui/react";
import { formatUSD } from "../../util/util";
import moment from "moment";

export interface IPoolBodyRowProps {
  transaction: any;
}

const PoolBodyRow = ({ transaction }: IPoolBodyRowProps) => {
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
};

export default PoolBodyRow;
