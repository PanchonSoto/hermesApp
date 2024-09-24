import { View, Text, FlatList, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { tabStyles } from '../../../config/theme/theme';

import { CustomView } from '../../components/ui/CustomView';
import { SearchTop } from '../../components/ui/SearchTop';
import WishlistItem from '../../components/products/WishlistItem';

import { WishListScreenStackParams } from '../../router/Stack/WishListStackNavigator';
import { getWishlistProductsByPage } from '../../../actions/product/get-wishlist-products';





interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

// const products: Product[] = [
//   { id: 1, name: 'Smartphone iPhone 13 Pro Max Negro Apple 256GB', price: 100, imageUrl: 'https://m.media-amazon.com/images/I/51UtM-A3fdL.jpg' },
//   { id: 2, name: 'Samsung Galaxy S24 Ultra 6.8" Dual SIM, 256GB, 12GB RAM, Gris', price: 200, imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/mx/2401/gallery/mx-galaxy-s24-s928-sm-s928bzkmltm-539300146?$650_519_PNG$' },
//   { id: 3, name: 'Samsung Galaxy S24 Ultra 6.8" Dual SIM, 256GB, 12GB RAM, Gris', price: 200, imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/mx/2401/gallery/mx-galaxy-s24-s928-sm-s928bzkmltm-539300146?$650_519_PNG$' },
//   // Add more products as needed
// ];

export const WhishListScreen: React.FC = () => {

  const navigation = useNavigation<NavigationProp<WishListScreenStackParams>>();

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['wishlist', 'infinite'],
    staleTime: 1000 * 60 * 60,//1 hour
    initialPageParam: 0,
    queryFn: async (params) => {
      return await getWishlistProductsByPage(params.pageParam + 1,);
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });



  return (
    <CustomView>
      {/* search bar */}
      <SearchTop />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* todo cambiar a customview */}
        <View style={{ paddingHorizontal: 10 }}>

          <Text style={tabStyles.title}>Wishlist</Text>
          <Pressable
            // onPress={() => navigation.navigate('Product', { productId: '123' })}
          >
            <FlatList
              data={data?.pages.map(page => page?.wishlist).flat().map(wishlist=>wishlist?.products) ?? []}
              // data={data?.pages.map(page=>page?.wishlist.flat())}
              keyExtractor={(item, index) => `${item?.id}-${index}`}
              renderItem={({ item }) => <WishlistItem product={item} />}
              scrollEnabled={false}
            />

          </Pressable>
        </View>
      </ScrollView>
    </CustomView>


  );
};
