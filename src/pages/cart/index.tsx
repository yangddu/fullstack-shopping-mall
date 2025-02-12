import { useQuery } from "@tanstack/react-query"
import { graphqlFetcher } from "../../queryClient"
import { CART, GET_CART } from "../../components/graphql/cart"
import CartList from "../../components/cart"

const Cart = () => {
    const { data } = useQuery({
        queryKey: ['GET_CART'],
        queryFn: () => graphqlFetcher(GET_CART),
        staleTime: 0,
        cacheTime: 1000
    })

    const cartItems = Object.values(data || {}) as CART[];
    if (!cartItems.length) return <div>장바구니가 비었어요</div>

    return (
        <CartList items={cartItems} />
    )
}

export default Cart