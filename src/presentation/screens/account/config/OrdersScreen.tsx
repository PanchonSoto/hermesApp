import { useContext } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getOrdersByPage } from '../../../../actions/product/get-orders';
import { ThemeContext } from '../../../context/ThemeContext';
import OrdersCard from '../../../components/products/UserOrders';




const OrdersScreen = () => {

  const { colors } = useContext(ThemeContext);

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['orders', 'infinite'],
    staleTime: 1000 * 60 * 60,//1 hour
    initialPageParam: 0,
    queryFn: async (params) => {
      return await getOrdersByPage(params.pageParam + 1,);
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });


  return (
    <View style={{backgroundColor:colors.background, flex:1,}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {
            (data?.pages.map(page => page?.userOrders).flat().length===0)
            ? ( <Text style={{ alignSelf: 'center', paddingTop: 200 }}>Wishlist empty...</Text> )
            :
            (
              <Pressable
              // onPress={() => navigation.navigate('Product', { productId: '123' })}
              style={{paddingHorizontal:5, paddingTop:20}}
              >
                <FlatList
                  data={data?.pages.map(page => page?.userOrders).flat() ?? []}
                  // data={data?.pages.map(page=>page?.wishlist.flat())}
                  // keyExtractor={(item, index) => `${item?.id}-${index}`}
                  renderItem={({ item }) => <OrdersCard order={item!} />}
                  scrollEnabled={false}
                />

              </Pressable>
            )

          }
      </ScrollView>
    </View>
  )
}

export default OrdersScreen;

const styles = StyleSheet.create({});
