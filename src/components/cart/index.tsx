import { CART } from "../graphql/cart"
import CartItem from "./item"

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