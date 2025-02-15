import { CART } from "../graphql/cart"

const ItemData = ({ imageUrl, price, title }: Pick<CART, 'imageUrl' | 'price' | 'title'>) => {
    return (
        <>
            <img src={imageUrl} />
            <div className="cart-item__title">{title}</div>
            <div className="cart-item__title">{price}</div>
        </>
    )
}

export default ItemData