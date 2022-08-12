import type { AppProps } from "next/app";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { TokensProvider } from "../hooks/useTokens";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <TokensProvider>
          <VStack maxW='1280px' margin='auto'>
            <Component {...pageProps} />
          </VStack>
        </TokensProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
