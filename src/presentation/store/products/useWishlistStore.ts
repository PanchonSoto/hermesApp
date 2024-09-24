import { create } from 'zustand';
import type{ InfiniteData } from '@tanstack/react-query';

import type{ Products, WishlistResponse } from "../../../domain/entities/productEntity";


export interface WishlistCachedData {
  pages: WishlistPage[];
  pageParams: number[];
}

export interface WishlistProduct {
id: number;
product_id: number;
user_id: number;
added_at: string;
products: Products;
}

export interface WishlistPage {
total: number;
wishlist: WishlistProduct[];
}

export interface WishlistStore {
  data: InfiniteData<WishlistResponse | undefined, unknown> | undefined;
  wishlist:  WishlistProduct[] | undefined;

  setWishlist: (wishlist:  WishlistProduct[] | undefined)=> void;
  setWishlistData: (data: InfiniteData<WishlistResponse | undefined, unknown> | undefined) => void;
}

export const useWishlistStore = create<WishlistStore>()((set) => ({
  data: undefined,
  wishlist: undefined,

  setWishlist: (wishlist) => set({wishlist}),
  setWishlistData: (data) => set({data}),
}));
