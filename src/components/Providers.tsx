import { ReactNode } from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

interface Props {
  children?: ReactNode | ReactNode[];
};

export const Providers = ({ children }: Props) => {

  const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={ client }>
      { children }
    </ApolloProvider>
  );

};
