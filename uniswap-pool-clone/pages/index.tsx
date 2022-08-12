import type { NextPage } from "next";

import { Button, HStack } from "@chakra-ui/react";

import useTokens, { TokensProvider } from "../hooks/useTokens";
import TokenTable from "../components/TokenTable";

const Home: NextPage = () => {
  const { incrementPage, decrementPage } = useTokens();

  return (
    <>
      <TokenTable />
      <HStack>
        <Button onClick={decrementPage}>Prev</Button>
        <Button onClick={incrementPage}>Next</Button>
      </HStack>
    </>
  );
};

export default Home;
