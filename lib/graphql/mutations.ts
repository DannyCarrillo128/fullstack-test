import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation Mutation($name: String, $email: String, $password: String, $phone: String, $role: String) {
    addUser(name: $name, email: $email, password: $password, phone: $phone, role: $role) {
      id
      name
      email
      phone
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($id: ID!, $name: String, $role: String) {
    updateUser(id: $id, name: $name, role: $role) {
      id
      name
      email
      phone
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation Mutation($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
      phone
      role
    }
  }
`;

export const ADD_MOVEMENT = gql`
  mutation Mutation($id: ID!, $amount: Int, $concept: String, $createdAt: String) {
    addMovement(userId: $id, amount: $amount, concept: $concept, createdAt: $createdAt) {
      id
      concept
      amount
      createdAt
      user {
        id
        name
      }
    }
  }
`;

export const UPDATE_MOVEMENT = gql`
  mutation Mutation($id: ID!, $concept: String, $amount: Int) {
    updateMovement(id: $id, concept: $concept, amount: $amount) {
      id
      concept
      amount
      createdAt
      userId
    }
  }
`;

export const DELETE_MOVEMENT = gql`
  mutation Mutation($id: ID!) {
    deleteMovement(id: $id) {
      id
      concept
      amount
      createdAt
      userId
    }
  }
`;
