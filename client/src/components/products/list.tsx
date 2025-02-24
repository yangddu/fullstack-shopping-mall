import { PRODUCT } from "../graphql/products";
import ProductItem from "./item";

const ProductList = ({ list }: { list : PRODUCT[] }) => (
    <ul className="products">
            {
                list?.map((product: PRODUCT) => (
                    <ProductItem {...product} key={product.id}/>
                ))
            }
        </ul>
)

export default ProductList

