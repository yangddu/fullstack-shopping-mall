import { gql } from "graphql-request";


export const EXCUTE_PAY = gql`
    type PayInfo {
        id: string
        amount: number
    }
    mutation EXCUTE_PAY($info: [PayInfo]) {
        payInfo(info: $info)
    }
`