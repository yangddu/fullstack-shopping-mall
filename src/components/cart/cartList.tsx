import { CART } from "../graphql/cart"
import CartItem from "./cartItem"

const CartList = ({ items }: { items: CART[] }) => {
    return (
        <ul>
            {
                items.map(item => <CartItem {...item} key={item.id} />)
            }
        </ul>
    )
}

export default CartList