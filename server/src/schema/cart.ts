import { gql } from 'apollo-server-express';

export const cartSchema = gql`
    type CartItem {
        id: ID!
        imageUrl: String!
        price: Int!
        title: String!
        amount: Int!
        createdAt: Float
    }
    
    extend type Query {
        cart: [CartItem!]!
    }

    extend type Mutation {
        addCart(id: ID!): CartItem!
        updateCart(id: ID!, amount: Int!): CartItem!
        deleteCart(id: ID!): Boolean!
        executePay(ids: [ID!]!): Boolean!
    }
`
export default cartSchema;