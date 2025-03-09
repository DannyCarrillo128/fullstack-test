import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Query {
    getUsers {
      id
      email
      name
      phone
      role
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query Query($id: ID!) {
    getUserById(id: $id) {
      id
      name
      email
      phone
      role
    }
  }
`;

export const GET_MOVEMENTS = gql`
  query Query {
    getMovements {
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

export const GET_MOVEMENT_BY_ID = gql`
  query Query($id: ID!) {
    getMovementById(id: $id) {
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
