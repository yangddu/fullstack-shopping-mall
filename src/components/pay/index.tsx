import { useRecoilValue } from "recoil"
import { checkedCartState } from "../../recoils/cart"
import ItemData from "../cart/itemData"
import { SyntheticEvent } from "react"

const Pay = ({
    handleSubmit,
    submitTitle
}: {
    submitTitle: string;
    handleSubmit: (e: SyntheticEvent) => void;
}) => {
    const checkedItems = useRecoilValue(checkedCartState)
    const totalPrice = checkedItems.reduce((res, {price, amount}) => {
        res += price * amount
        return res
    }, 0)

    return (
        <div className="cart-pay">
            <ul>
                {checkedItems.map(({ imageUrl, price, title, amount, id}) => (
                    <li key={id}>
                        <ItemData imageUrl={imageUrl} title={title} price={price} amount={amount}/>
                        <p>수량 : {amount}</p>
                        <p>금액: {price * amount}</p>
                    </li>
                ))}
            </ul>
            <p>총 예상 결제액: {totalPrice}</p>
            <button onClick={handleSubmit}>{submitTitle}</button>
        </div>
    )
}

export default Pay