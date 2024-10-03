import { View, Text, FlatList, Pressable, ScrollView } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';

import { tabStyles } from '../../../config/theme/theme';

import { CustomView } from '../../components/ui/CustomView';
import { SearchTop } from '../../components/ui/SearchTop';
import WishlistItem from '../../components/products/WishlistItem';

import { getWishlistProductsByPage } from '../../../actions/product/get-wishlist-products';





export const WhishListScreen: React.FC = () => {


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
          {
            (data?.pages.map(page => page?.wishlist).flat().map(wishlist => wishlist?.products).length===0)
            ? ( <Text style={{ alignSelf: 'center', paddingTop: 200 }}>Wishlist empty...</Text> )
            :
            (
              <Pressable
              // onPress={() => navigation.navigate('Product', { productId: '123' })}
              >
                <FlatList
                  data={data?.pages.map(page => page?.wishlist).flat().map(wishlist => wishlist?.products) ?? []}
                  // data={data?.pages.map(page=>page?.wishlist.flat())}
                  keyExtractor={(item, index) => `${item?.id}-${index}`}
                  renderItem={({ item }) => <WishlistItem product={item} />}
                  scrollEnabled={false}
                />

              </Pressable>
            )

          }
        </View>
      </ScrollView>
    </CustomView>


  );
};
