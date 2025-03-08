import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';

import { prisma } from '../../../lib/prisma';
import resolvers from '../../../lib/graphql/resolvers';
import typeDefs from '../../../lib/graphql/typeDefs';

export type Context = {
  prisma: PrismaClient;
};

const server = new ApolloServer({
  resolvers,
  typeDefs
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({ req, res, prisma })
});
