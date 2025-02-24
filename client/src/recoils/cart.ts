import { atom, selectorFamily } from 'recoil';
import { CART } from '../components/graphql/cart';

export const checkedCartState = atom<CART[]>({
    key: 'cartState',
    default: [],
});