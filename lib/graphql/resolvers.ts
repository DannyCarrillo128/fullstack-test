import { Context } from '@/pages/api/graphql';

const resolvers = {
  Query: {
    getUsers: async (parent: any, args: any, context: Context) => {
      return await context.prisma.user.findMany();
    },
    getUserById: async (parent: any, args: any, context: Context) => {
      return await context.prisma.user.findUnique({
        where: {
          id: args.id
        }
      });
    },

    getMovements: async (parent: any, args: any, context: Context) => {
      return await context.prisma.movement.findMany();
    },
    getMovementById: async (parent: any, args: any, context: Context) => {
      return await context.prisma.movement.findUnique({
        where: {
          id: args.id
        }
      });
    }
  },
  Mutation: {
    addUser: async (parent: any, args: any, context: Context) => {
      return await context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
          phone: args.phone,
          role: args.role
        }
      });
    },
    updateUser: async (parent: any, args: any, context: Context) => {
      return await context.prisma.user.update({
        where: {
          id: args.id
        },
        data: {
          name: args.name,
          role: args.role
        }
      });
    },
    deleteUser: async (parent: any, args: any, context: Context) => {
      return await context.prisma.user.delete({
        where: {
          id: args.id
        }
      });
    },

    addMovement: async (parent: any, args: any, context: Context) => {
      return await context.prisma.movement.create({
        data: {
          amount: args.amount,
          concept: args.concept,
          createdAt: args.createdAt,
          userId: args.userId
        }
      });
    },
    updateMovement: async (parent: any, args: any, context: Context) => {
      return await context.prisma.movement.update({
        where: {
          id: args.id
        },
        data: {
          amount: args.amount,
          concept: args.concept
        }
      });
    },
    deleteMovement: async (parent: any, args: any, context: Context) => {
      return await context.prisma.movement.delete({
        where: {
          id: args.id
        }
      });
    },
  },
  User: {
    movements: async (parent: any, args: any, context: Context) => {
      return await context.prisma.movement.findMany({
        where: {
          userId: parent.id
        }
      });
    }
  }
};

export default resolvers;
