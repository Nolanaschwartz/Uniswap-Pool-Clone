import usePool from "../../hooks/usePool";
import PoolTransactionSelector from "./PoolTransactionSelector";
import PoolTable from "./PoolTable";
import { Grid, GridItem } from "@chakra-ui/react";

const PoolContainer = () => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={12} width={"100%"}>
      <GridItem colSpan={4}>
        <PoolTransactionSelector />
      </GridItem>
      <GridItem colSpan={12}>
        <PoolTable />
      </GridItem>
    </Grid>
  );
};

export default PoolContainer;
