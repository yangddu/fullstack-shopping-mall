import { useRecoilState } from "recoil"
import { checkedCartState } from "../../recoils/cart"
import Pay from "../pay"
import PaymentModal from "./modal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { graphqlFetcher } from "../../queryClient"
import { EXCUTE_PAY } from "../graphql/payment"

type PayInfo = {
    id: string;
    amount: number;
}

type PaymentInfos = PayInfo[];

const Payment = () => {
    const navigate = useNavigate();
    const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState)
    const [modalShow, toggleModal] = useState(false)
    
    const showModal = () => {
        toggleModal(true)
    }
    
    const { mutate: excutePay } = useMutation({
        mutationFn: (payInfos: PaymentInfos) => graphqlFetcher(EXCUTE_PAY, payInfos)
    })

    const proceed = () => {
        const payInfos = checkedCartData.map(({ id, amount }) => (
            {id, amount}))
        excutePay(payInfos)
        setCheckedCartData([])
        navigate('/products', { replace: true })
    }

    const cancel = () => {
        toggleModal(false)
    }

    return (
        <div>
            <Pay submitTitle="결제하기" handleSubmit={showModal}/>
            <PaymentModal show={modalShow} proceed={proceed} cancel={cancel} />
        </div>
    )
}

export default Payment