import { useMutation } from "@tanstack/react-query";
import { CART, UPDATE_CART } from "../graphql/cart";
import { graphqlFetcher } from "../../queryClient";
import { SyntheticEvent } from "react";

const CartItem = ({
    id,
    imageUrl,
    price,
    title,
    amount
}: CART) => {
    const { mutate: updateCart } = useMutation({
        mutationFn: ({ id, amount }: { id: string, amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount })
    });

    const handleUpdateCart = (e: SyntheticEvent) => {
        const amount = Number((e.target as HTMLInputElement).value)
        updateCart({ id, amount })
    }

    return (
        <li className="cart-item">
            <div className="cart-item__title">{title}</div>
            <div className="cart-item__title">{price}</div>
            <img src={imageUrl} />
            <input type="number" value={amount} onChange={handleUpdateCart}/>
        </li>
    )
}

export default CartItem