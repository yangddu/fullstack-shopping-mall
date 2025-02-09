import { CART } from "../graphql/cart";

const CartItem = ({
    id,
    imageUrl,
    price,
    title,
    amount
}: CART) => (
    <li>
        {id}
        {imageUrl}
        {price}
        {title}
        {amount}
    </li>
)

export default CartItem