import {
    QueryClient,
  } from '@tanstack/react-query'
  import { request, RequestDocument } from 'graphql-request';

type AnyOBJ = { [key: string] }

export const getClient = (() => {
    let client: QueryClient | null = null;
    return () => {
        if (!client) client = new QueryClient({
            defaultOptions: {
                queries: {
                    cacheTime: 1000 * 60 * 60 * 24,
                    staleTime: 1000 * 60,
                    refetchOnMount: false,
                    refetchOnReconnect: false,
                    refetchOnWindowFocus: false,
                }
            }

        })
        return client
    }
})()

const BASE_URL = ''

// export const restFetcher = async ({
//     method,
//     path,
//     params,
//     body,
// }: {
//     method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
//     path: string;
//     params?: AnyOBJ;
//     body?: AnyOBJ;
// }) => {
//     try {
//         let url = `${BASE_URL}${path}`
//         const fetchOptions: RequestInit = {
//             method,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': BASE_URL
//             }
//         }
//         if (params) {
//             const searchParams = new URLSearchParams(params)
//             url += '?' + searchParams.toString()
//         }
//         if (body) fetchOptions.body = JSON.stringify(body)
//         const res = await fetch(url, fetchOptions);
//         const json = await res.json();
//         return json;
//     } catch (err) {
//         console.error(err);
//     }
// }

export const graphqlFetcher = (
    query: RequestDocument, 
    variables = {}
) => {
    const response = request(BASE_URL, query, variables);
    return response
}

export const QueryKeys = {
    PRODUCTS: 'products',
    CART: 'carts'
}