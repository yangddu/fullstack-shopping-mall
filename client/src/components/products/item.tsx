import { Link } from "react-router-dom";
import { PRODUCT } from "../graphql/products";
import { useMutation } from "@tanstack/react-query";
import { graphqlFetcher } from "../../queryClient";
import { ADD_CART } from "../graphql/cart";

const ProductItem = ({
    imageUrl,
    description,
    id,
    price,
    title
}: PRODUCT) => {
    const { mutate: addCart } = useMutation({
        mutationFn: (id) => 
            graphqlFetcher(ADD_CART, { id })

    })
    return (
        <li className="product-item">
        <Link to={`/products/${id}`}>
            <p className="product-item__title">{title}</p>
            <p className="product-item__description">{description}</p>
            <img className="product-item__image" src={imageUrl} />
            <span >${price}</span>
        </Link>
        <button className="product-item__add-cart" onClick={() => addCart(id)}>담기</button>
    </li>
    )
}

export default ProductItem;