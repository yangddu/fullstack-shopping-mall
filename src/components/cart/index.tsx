import { createRef, SyntheticEvent, useRef } from "react"
import { CART } from "../graphql/cart"
import CartItem from "./item"
import { checkedCartState } from "../../recoils/cart"
import { useSetRecoilState } from "recoil"
import Pay from "./pay"

const CartList = ({ items }: { items: CART[] }) => {
    const setCheckedCartData = useSetRecoilState(checkedCartState)
    const formRef = useRef<HTMLFormElement>(null)
    const checkBoxRefs = items.map(() => createRef<HTMLInputElement>())

    const handleCheckBoxChanged = (e: SyntheticEvent) => {
        if (!formRef.current) return
        const targetInput = e.target as HTMLInputElement;
        const data = new FormData(formRef.current)
        const selectedCount = data.getAll('select-item').length

        if (targetInput.classList.contains('select-all')) {
            const allChecked = targetInput.checked;
            checkBoxRefs.forEach(inputElem => {
                inputElem.current!.checked = allChecked
            })
        } else {
            const allChecked = (selectedCount === items.length)
            formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked
        }

        const checkedItems = checkBoxRefs.reduce<CART[]>((res, ref, i) => {
            if (ref.current!.checked) res.push(items[i])
                return res
        }, [])
        setCheckedCartData(checkedItems)
    }
    return (
        <div>
        <form ref={formRef} onChange={handleCheckBoxChanged}>
            <label>
                <input className="select-all" name="select-all" type="checkbox" />
                전체선택
            </label>
            <ul className="cart">
                {
                    items.map((item, i) => <CartItem {...item} key={item.id} ref={checkBoxRefs[i]}/>)
                }
            </ul>
        </form>
        <Pay />
        </div>
    )
}

export default CartList