import { atom, selectorFamily } from 'recoil';
import { CART } from '../components/graphql/cart';
import { AtomEffect } from 'recoil';

const localStorageEffect: AtomEffect<CART[]> = ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem('checkedCart')
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
        localStorage.setItem('checkedCart', JSON.stringify(newValue));
    });
};

export const checkedCartState = atom<CART[]>({
    key: 'cartState',
    default: [],
    effects: [localStorageEffect]
});