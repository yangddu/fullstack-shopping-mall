import { createRef, SyntheticEvent, useEffect, useRef, useState, useCallback } from "react"
import { CART } from "../graphql/cart"
import CartItem from "./item"
import { checkedCartState } from "../../recoils/cart"
import { useRecoilState } from "recoil"
import Pay from "./pay"

const CartList = ({ items }: { items: CART[] }) => {
    const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState)
    const formRef = useRef<HTMLFormElement>(null)
    const checkBoxRefs = items.map(() => createRef<HTMLInputElement>())
    const [formData, setFormData] = useState<FormData>()

    const setAllCheckedFormItems = () => {
        if (!formRef.current) return
        const data = new FormData(formRef.current)
        const selectedCount = data.getAll('select-item').length
        const allChecked = (selectedCount === items.length)
        formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked
    }

    const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
        const allChecked = targetInput.checked;
            checkBoxRefs.forEach(inputElem => {
                inputElem.current!.checked = allChecked
            })
    }

    const handleCheckBoxChanged = (e?: SyntheticEvent) => {
        if (!formRef.current) return
        const targetInput = e?.target as HTMLInputElement
        if (targetInput && targetInput.classList.contains('select-all')) {
            setItemsCheckedFromAll(targetInput)
        } else {
            setAllCheckedFormItems()
        }

        const data = new FormData(formRef.current)
        setFormData(data)
    }

    const restoreCheckedItems = useCallback(() => {
        checkBoxRefs.forEach((ref, i) => {
            if (!ref.current) return
            const isChecked = checkedCartData.some(item => item.id === items[i].id)
            ref.current.checked = isChecked
        })
        
        // 전체선택 체크박스 상태 업데이트
        if (formRef.current) {
            const allChecked = checkedCartData.length === items.length
            formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked
        }
    }, [checkedCartData, items])

    useEffect(() => {
        restoreCheckedItems()
    }, [restoreCheckedItems])

    useEffect(() => {
        const checkedItems = checkBoxRefs.reduce<CART[]>((res, ref, i) => {
            if (ref.current!.checked) res.push(items[i])
                return res
        }, [])
        setCheckedCartData(checkedItems)
    }, [items, formData])

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