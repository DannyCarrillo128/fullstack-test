import { ReactNode } from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

interface Props {
  children?: ReactNode | ReactNode[];
};

export const Providers = ({ children }: Props) => {
  console.log(process.env.GRAPHQL_URL);
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={ client }>
      { children }
    </ApolloProvider>
  );

};
