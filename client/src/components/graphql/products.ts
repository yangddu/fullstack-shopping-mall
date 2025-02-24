import { gql } from 'graphql-tag'

export type PRODUCT = {
    id?: string;
    imageUrl?: string
    price?: number
    title?: string
    description?: string
    createdAt?: string
}

export type PRODUCTS = {
    products: PRODUCT[];
}

export const GET_PRODUCT = gql`
    query GET_PRODUCT($id: string) {
        id
        imageUrl
        price
        title
        description
        createdAt
    }
`

export const GET_PRODUCTS = gql`
    query GET_PRODUCTS {
        products {
            id
            imageUrl
            price
            title
            description
            createdAt
        }
    }
`

export default GET_PRODUCTS