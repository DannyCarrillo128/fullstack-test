const typeDefs = `#graphql
  type User {
    id: ID!
    name: String
    email: String
    password: String
    phone: String
    role: String
    movements: [Movement]
  }

  type Movement {
    id: ID!
    amount: Int
    concept: String
    createdAt: String
    userId: String
    user: User
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User

    getMovements: [Movement]
    getMovementById(id: ID!): Movement
  }

  type Mutation {
    addUser(name: String, email: String, password: String, phone: String, role: String): User
    updateUser(id: ID!, name: String, role: String): User
    deleteUser(id: ID!): User

    addMovement(amount: Int, concept: String, createdAt: String, userId: ID!): Movement
    updateMovement(id: ID!, amount: Int, concept: String): Movement
    deleteMovement(id: ID!): Movement
  }
`;

export default typeDefs;
