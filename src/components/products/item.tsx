import { Link } from "react-router-dom";
import { PRODUCT } from "../graphql/products";
import { cartItemSelector } from "../../recoils/cart";
import { useRecoilState } from "recoil";

const ProductItem = ({
    imageUrl,
    description,
    id,
    price,
    title
}: PRODUCT) => {
    const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id));
    const addToCart = () => setCartAmount(prev => (prev || 0) + 1);

    return (
        <li className="product-item">
        <Link to={`/products/${id}`}>
            <p className="product-item__title">{title}</p>
            <p className="product-item__description">{description}</p>
            <img className="product-item__image" src={imageUrl} />
            <span >${price}</span>
        </Link>
        <button className="product-item__add-cart" onClick={addToCart}>담기</button>
        <span>{cartAmount || 0}</span>
    </li>
    )
}

export default ProductItem;