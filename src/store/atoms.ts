import { atom } from 'recoil';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

export const cartOpenState = atom<boolean>({
  key: 'cartOpenState',
  default: false,
});

export const authModalState = atom<'login' | 'register' | null>({
  key: 'authModalState',
  default: null,
});