import { useMutation } from "@tanstack/react-query";
import { CART, DELETE_CART, UPDATE_CART } from "../graphql/cart";
import { getClient, graphqlFetcher } from "../../queryClient";
import { ForwardedRef, forwardRef, SyntheticEvent } from "react";

const CartItem = ({
    id,
    imageUrl,
    price,
    title,
    amount
}: CART, ref: ForwardedRef<HTMLInputElement>) => {
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

    const { mutate: deleteCart } = useMutation({
        mutationFn: (id: string) => graphqlFetcher(DELETE_CART, { id }),
        onSuccess: () => {
            queryClient.invalidateQueries(['GET_CART'])
        }
    })

    const handleUpdateCart = (e: SyntheticEvent) => {
        const amount = Number((e.target as HTMLInputElement).value)
        if (amount < 1) return
        updateCart({ id, amount })
    }

    const handleDeleteItem = () => {
        deleteCart(id)
    }

    return (
        <li className="cart-item">
            <input type="checkbox" className="cart-item__checkbox" name="select-item" ref={ref}/>
            <img src={imageUrl} />
            <div className="cart-item__title">{title}</div>
            <div className="cart-item__title">{price}</div>
            <input type="number" value={amount} min={1} onChange={handleUpdateCart}/>
            <button type="button" className="cart-item__button" onClick={handleDeleteItem}>삭제</button>
        </li>
    )
}

export default forwardRef(CartItem)