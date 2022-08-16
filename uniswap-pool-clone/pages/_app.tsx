import type { AppProps } from "next/app";
import { Box, ChakraProvider, Container, Grid, VStack } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PoolsProvider } from "../hooks/usePools";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <PoolsProvider>
          <Box width={"1280px"} margin="auto">
            <Grid templateColumns="repeat(12, 1fr)" gap={12}>
              <Component {...pageProps} />
            </Grid>
          </Box>
        </PoolsProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
