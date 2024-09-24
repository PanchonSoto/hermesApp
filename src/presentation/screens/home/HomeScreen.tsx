import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getProductsByPage } from '../../../actions/product/get-products-by-page';
import { FakeStoreAPI } from '../../../infrastructure/interfaces/product/fakeStoreApi';

import { CustomView } from '../../components/ui/CustomView';
import { SearchTop } from '../../components/ui/SearchTop';
import ProductsVerticalCards from '../../components/products/ProductsVerticalCards';
import { getWishlistProductsByPage } from '../../../actions/product/get-wishlist-products';






export const HomeScreen = () => {

  // const { top } = useSafeAreaInsets();
  const [products, setProducts] = useState<FakeStoreAPI[]>([]);


  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,//1 hour
    initialPageParam: 0,
    queryFn: async (params) => {
      return await getProductsByPage(params.pageParam + 1,);
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  const { } = useInfiniteQuery({
    queryKey: ['wishlist', 'infinite'],
    staleTime: 1000 * 60 * 60,//1 hour
    initialPageParam: 0,
    queryFn: async (params) => {
      return await getWishlistProductsByPage(params.pageParam + 1,);
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });


  useEffect(() => {
    // Fetch data from the API
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (

    <CustomView>
      {/* search bar */}
      <SearchTop />

      <View style={{ paddingHorizontal: 5, }}>
        {/* all products */}
        <View>
          <ProductsVerticalCards data={data} nextPage={fetchNextPage} recenltyProducts={products} isLoading={isLoading} />
        </View>

      </View>
    </CustomView>

  );
}
