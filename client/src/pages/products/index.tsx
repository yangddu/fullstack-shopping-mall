import { useQuery } from "@tanstack/react-query"
import { graphqlFetcher } from "../../queryClient"
import { GET_PRODUCTS, PRODUCTS } from "../../components/graphql/products"
import ProductList from "../../components/products/list"

const ProductListPage = () => {
    const { data } = useQuery<PRODUCTS>({
        queryKey: ['GET_PRODUCTS'],
        queryFn: () => graphqlFetcher(GET_PRODUCTS)
    })

    return (
    <div>
        <h2>상품목록</h2>
        <ProductList list={data?.products || []}/>
    </div>)
}

export default ProductListPage