import { useMutation } from "@tanstack/react-query";
import { CART, UPDATE_CART } from "../graphql/cart";
import { getClient, graphqlFetcher } from "../../queryClient";
import { SyntheticEvent } from "react";

const CartItem = ({
    id,
    imageUrl,
    price,
    title,
    amount
}: CART) => {
    const queryClient = getClient();
    const { mutate: updateCart } = useMutation({
        mutationFn: ({ id, amount }: { id: string, amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }),
        onMutate: async ({ id, amount }: { id: string, amount: number }) => {
            await queryClient.cancelQueries(['GET_CART']);
            const prevCart = queryClient.getQueryData<{ [key: string]:CART }>(['GET_CART']);
            if (!prevCart?.[id]) return prevCart
            const newCart = {
                ...(prevCart || {}),
                [id]: {...prevCart[id], amount}
            }
            queryClient.setQueryData(['GET_CART'], newCart)
            return prevCart
        },
        onSuccess: (newValue, { id }) => {
            const prevCart = queryClient.getQueryData<{ [key: string]:CART }>(['GET_CART']);
            const newCart = {
                ...(prevCart || {}),
                [id]: newValue
            }
            queryClient.setQueryData(['GET_CART'], newCart)
        }
    })

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