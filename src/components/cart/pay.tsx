import { useRecoilValue } from "recoil"
import { checkedCartState } from "../../recoils/cart"
import ItemData from "./itemData"
import { useNavigate } from "react-router-dom"

const Pay = () => {
    const navigate = useNavigate(); 
    const checkedItems = useRecoilValue(checkedCartState)
    const totalPrice = checkedItems.reduce((res, {price, amount}) => {
        res += price * amount
        return res
    }, 0)

    const handleSubmit = () => {
        if (checkedItems.length) {
            navigate('/payment')
        } else {
            alert('결제할 대상이 없어요')
        }
    }

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
            <button onClick={handleSubmit}>결제하기</button>
        </div>
    )
}

export default Pay