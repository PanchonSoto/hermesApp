import { create } from 'zustand';
import { InfiniteData } from '@tanstack/react-query';

import { Product } from "../../../domain/entities/productEntity";


export interface ProductStore {
  data: InfiniteData<Product | undefined, unknown> | undefined;
  setProductsData: (data: InfiniteData<Product | undefined, unknown> | undefined) => void;
}

export const useProductsStore = create<ProductStore>()((set) => ({
  data: undefined,
  setProductsData: (data) => set({data}),
}));
