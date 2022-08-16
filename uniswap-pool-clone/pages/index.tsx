import type { NextPage } from "next";

import { GridItem } from "@chakra-ui/react";

import PoolsTable from "../components/PoolsTable";

const Home: NextPage = () => {
  return (
    <GridItem w="100%" colSpan={12}>
      <PoolsTable />
    </GridItem>
  );
};

export default Home;
