import { useQuery } from "@tanstack/react-query"
import { graphqlFetcher } from "../../queryClient"
import ProductItem from "../../components/products/item"
import { GET_PRODUCTS, PRODUCT } from "../../components/graphql/products"

const ProductList = () => {
    const { data } = useQuery<PRODUCT>({
        queryKey: ['GET_PRODUCTS'],
        queryFn: () => graphqlFetcher(GET_PRODUCTS)
    })

    console.log('data', data)
    return (
    <div>
        <h2>상품목록</h2>
        <ul className="products">
            {
                data?.products?.map((product: PRODUCT) => (
                    <ProductItem {...product} key={product.id}/>
                ))
            }
        </ul>
    </div>)
}

export default ProductList