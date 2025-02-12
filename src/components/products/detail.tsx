import { PRODUCT } from "../graphql/products";

const ProductDetail = ({
    item: {
        title,
        imageUrl,
        description,
        price,
    }
}: {
    item: PRODUCT
}) => {
    return (
        <div className="product-detail">
            <h2 className="product-detail__title">{title}</h2>    
            <p className="product-detail__description">{description}</p>
            <img className="product-detail__image" src={imageUrl} />
            <span className="product-detail__price">${price}</span>
        </div>
    )
}

export default ProductDetail;