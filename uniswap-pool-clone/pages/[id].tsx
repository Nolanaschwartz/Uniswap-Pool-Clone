import { PoolProvider } from "../hooks/usePool";
import PoolContainer from "../components/Pool/PoolContainer";
import Link from "next/link";
import { GridItem, HStack } from "@chakra-ui/react";

const PoolPage = () => {
  return (
    <PoolProvider>
      <GridItem w="100%" colSpan={12}>
        <HStack width="100%">
          <Link href="/">Back to Pools</Link>
        </HStack>
        <PoolContainer />
      </GridItem>
    </PoolProvider>
  );
};

export default PoolPage;
