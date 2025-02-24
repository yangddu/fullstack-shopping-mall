import { gql } from 'apollo-server-express';

export const postSchema = gql`
    type PostItem {
        id: ID!
        title: String!
        content: String!
        createdAt: Float
    }

    extend type Query {
        posts: [PostItem!]!
        post(id: ID!): PostItem!    
    }

    extend type Mutation {
        addPost(title: String!, content: String!): PostItem!
        updatePost(id: ID!, title: String!, content: String!): PostItem!
        deletePost(id: ID!): Boolean!
    }
`
export default postSchema;