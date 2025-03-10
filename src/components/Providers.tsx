import { ReactNode } from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

interface Props {
  children?: ReactNode | ReactNode[];
};

export const Providers = ({ children }: Props) => {

  const client = new ApolloClient({
    uri: process.env.GRAPHQL_URL || 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={ client }>
      { children }
    </ApolloProvider>
  );

};
