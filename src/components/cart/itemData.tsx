import { CART } from "../graphql/cart"

const ItemData = ({ imageUrl, price, title }: Pick<CART, 'imageUrl' | 'price' | 'title' | 'amount'>) => {
    return (
        <>
            <img src={imageUrl} />
            <div className="cart-item__title">{title}</div>
            <div className="cart-item__price">{price}</div>
        </>
    )
}

export default ItemData