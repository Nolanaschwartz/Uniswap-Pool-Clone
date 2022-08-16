import { Select, Heading, HStack, GridItem } from "@chakra-ui/react";
import usePool, { TransactionType } from "../../hooks/usePool";

const PoolTransactionSelector = () => {
  const { setFilter } = usePool();

  return (
    <HStack>
      <Heading as="h3" size="md">
        Transactions
      </Heading>
      <Select
        placeholder={"Select"}
        defaultValue={TransactionType.ALL}
        size="md"
        width="md"
        onChange={(e) => {
          if (e.target.value) {
            setFilter(parseInt(e.target.value) as TransactionType);
          }
        }}
      >
        <option value={TransactionType.SWAPS}>Swaps</option>
        <option value={TransactionType.BURNS}>Burns</option>
        <option value={TransactionType.MINTS}>Mints</option>
        <option value={TransactionType.ALL}>All</option>
      </Select>
    </HStack>
  );
};

export default PoolTransactionSelector;
