import PoolTransactionSelector from "./PoolTransactionSelector";
import PoolTable from "./PoolTable";
import { Grid, GridItem } from "@chakra-ui/react";

const PoolContainer = () => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={12} width={"100%"}>
      <GridItem colSpan={4}>
        <PoolTransactionSelector />
      </GridItem>
      <GridItem
        colSpan={12}
        border="2px solid #000"
        borderRadius={"4px"}
        padding={"8px"}
      >
        <PoolTable />
      </GridItem>
    </Grid>
  );
};

export default PoolContainer;
