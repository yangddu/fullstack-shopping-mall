import { useQuery } from "@tanstack/react-query"
import { graphqlFetcher } from "../../queryClient"
import { useParams } from "react-router-dom"
import ProductDetail from "../../components/products/detail"
import { GET_PRODUCT, PRODUCT } from "../../components/graphql/products"

const ProductDetailPage = () => {
    const { id } = useParams();
    
    const { data } = useQuery<PRODUCT>({
        queryKey: ['GET_PRODUCTS', id],
        queryFn: () => graphqlFetcher(GET_PRODUCT, { id }),
        enabled: !!id
    })

    if (!data) return null;
    return (
        <div>
            <h2>상품상세</h2>
            <ProductDetail item={data.product} />
        </div>
      );
}

export default ProductDetailPage