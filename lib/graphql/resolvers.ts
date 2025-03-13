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
    getUserByEmail: async (parent: any, args: any, context: Context) => {
      return await context.prisma.user.findUnique({
        where: { email: args.email }
      });
    },

    getMovements: async (parent: any, args: any, context: Context) => {
      return await context.prisma.movement.findMany({
        include: {
          user: true
        }
      });
    },
    getMovementById: async (parent: any, args: any, context: Context) => {
      return await context.prisma.movement.findUnique({
        where: {
          id: args.id
        },
        include: {
          user: true
        }
      });
    },
    getUsersFinancials: async (parent: any, args: any, context: Context) => {
      const users = await context.prisma.user.findMany();

      const userFinancials = await Promise.all(
        users.map(async (user) => {
          const totalIncomes = await context.prisma.movement.aggregate({
            where: {
              userId: user.id,
              concept: 'income',
            },
            _sum: { amount: true }
          });

          const totalExpenses = await context.prisma.movement.aggregate({
            where: {
              userId: user.id,
              concept: 'expense',
            },
            _sum: { amount: true }
          });

          let expenses = totalExpenses._sum.amount || 0;

          if (expenses < 0) expenses = expenses * (-1)

          return {
            name: user.name,
            incomes: totalIncomes._sum.amount || 0,
            expenses
          };
      }));

      return userFinancials;
    },
    getTotalAmount: async (parent: any, args: any, context: Context) => {
      const total = await context.prisma.movement.aggregate({
        _sum: { amount: true }
      });

      return total._sum.amount || 0;
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
      let amount = args.amount;

      if (args.concept === 'expense') {
        amount = amount*(-1);
      }

      return await context.prisma.movement.create({
        data: {
          amount,
          concept: args.concept,
          createdAt: args.createdAt,
          userId: args.userId
        },
        include: {
          user: true
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
