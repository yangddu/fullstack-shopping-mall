import { atom, selectorFamily } from 'recoil';

export const cartState = atom<Map<string, number>>({
    key: 'cartState',
    default: new Map()
});

export const cartItemSelector = selectorFamily<number | undefined, string>({
    key: 'carItem',
    get:
        (id: string) =>

        ({ get }) => {
            const carts = get(cartState)
            return carts.get(id)
        },
    set:
        (id: string) =>
        ({ get, set }, newValue) => {
            console.log('newValue', newValue)
            if (typeof newValue === 'number') {
                const newCart = new Map([...get(cartState)])
                newCart.set(id, newValue)
                set(cartState, newCart)
            }
        }
})