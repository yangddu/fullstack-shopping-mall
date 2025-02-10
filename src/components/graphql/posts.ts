import { gql } from 'graphql-tag'

export type POST = {
    id: string;
    imageUrl: string;
    price: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export type POSTS = {
    posts: POST[];
}

export const GET_POST = gql`
    query GET_POST($id: string) {
        id
        imageUrl
        price
        title
        description
        createdAt
        updatedAt
    }
`

export const GET_POSTS = gql`
    query GET_POSTS {
        posts {
            id
            imageUrl
            price
            title
            description
            createdAt
            updatedAt
        }
    }
`

export const CREATE_POST = gql`
    mutation CREATE_POST($title: string, $description: string) {
        createPost(title: $title, description: $description) {
            id
            title
            description
            imageUrl
            createdAt
        }
    }
`

export const EDIT_POST = gql`
    mutation EDIT_POST($id: string, $title: string, $description: string) {
        editPost(id: $id, title: $title, description: $description) {
            id
            title
            description
            updatedAt
        }
    }
`