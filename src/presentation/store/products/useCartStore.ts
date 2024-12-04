import { create } from 'zustand';

import Decimal from 'decimal.js';


import type { Products } from "../../../domain/entities/productEntity";



export interface CartProduct extends Products {
  quantity: number;
}

export interface Cart {
  cart: CartProduct[];
  total: number,

  deleteProductCart: (id: number) => void;
  addProductToCart: (product: Products, quantity: number) => void;
  updatePrice: () => void;
  resetCart: () => void;
}

export const useCartStore = create<Cart>()((set, get) => ({
  cart: [],
  total: 0,

  updatePrice() {

    if (get().cart.length === 0) {
      set(() => ({ total: 0 }));
      return;
    };
    // const prices = get().cart.map((product) => Number(product.price) * product.quantity);
    // const total = prices.reduce((acc, curr) => acc + curr);
    const total = get().cart
      .map((product) => new Decimal(product.price).times(product.quantity))
      .reduce((acc, curr) => acc.plus(curr), new Decimal(0))
      .toNumber();
    set(() => ({ total: total }));
  },

  deleteProductCart(id) {
    const cart = get().cart;
    const inCart = cart.find(cartItem => cartItem.id === id);

    if (!inCart) return;

    set((state) => ({
      cart: state.cart.filter(cartItem => cartItem.id !== id),
    }));

    get().updatePrice();
  },

  addProductToCart: (product: Products, quantity: number) => {
    const cart = get().cart;
    const inCart = cart.find(cartItem => cartItem.id === product.id);

    if (inCart) {
      //if product exist in cart add 1 to quantity
      set((state) => ({
        cart: state.cart.map(cartItem => {
          if (cartItem.id === product.id) {
            const newQuantity = cartItem.quantity + quantity;

            if (newQuantity > product.stock) return { ...cartItem, quantity: product.stock }; //if quantity greater than stock set all stock

            return newQuantity > 0
              ? { ...cartItem, quantity: newQuantity }//add if quiantity is greater than 0
              : { ...cartItem, quantity: 1 }; //prevent negative quantity
          }

          return cartItem;
        }),
      }));

    } else if (quantity > 0) {
      //product not exist in cart add
      set((state) => ({
        cart: [...state.cart, { ...product, quantity: quantity }],
      }));
    }
    get().updatePrice();
  },

  resetCart: () => set(() => ({ cart: [], total:0 })),
}));
