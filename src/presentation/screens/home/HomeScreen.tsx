import { Animated, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationProp, useNavigation, useScrollToTop } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';


import { CustomView } from '../../components/ui/CustomView';


import { FakeStoreAPI } from '../../../infrastructure/interfaces/product/fakeStoreApi';

import { HomeScreenStackParams } from '../../router/Stack/HomeStackNavigator';
import { globalStyles } from '../../../config/theme/theme';
import { SearchTop } from '../../components/ui/SearchTop';







export const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<HomeScreenStackParams>>();
  // const { top } = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);


  const [products, setProducts] = useState<FakeStoreAPI[]>([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const scrollAtTopp = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };


  return (

    <View style={{flex:1}}>
      {/* search bar */}
      <SearchTop />

      <CustomView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} >

          {/* recently */}
          <View style={styles.list}>
            <Text style={styles.listTitle}>Recently viewed</Text>

            {/* <View style={styles.listHeader}> */}
            <FlatList
              data={products}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.cardContainerH}>
                  <Image style={styles.cardImageH} source={{ uri: item.image }} />

                  {/* <Text style={styles.cardTitle}>{item.title}</Text> */}


                  {/* <Text style={styles.cardTitle}>Price:  {item.price}</Text> */}
                </View>
              )}
            />

            {/* </View> */}
          </View>

          {/* all products */}
          <View style={styles.list}>
            <Text style={styles.listTitle}>All products</Text>

            {/* <View style={styles.listHeader}> */}
            <FlatList
              data={products}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.cardContainerV}>
                  <Image style={styles.cardImageV} source={{ uri: item.image }} />

                  <Text style={[globalStyles.subTitle,{marginTop:5}]}>
                    {item.title.slice(0, 18)}
                  </Text>


                  <Text style={[styles.listTitle, { marginTop: 2 }]}>${item.price}</Text>
                </View>
              )}
            />

            {/* </View> */}
          </View>
          <Pressable style={[globalStyles.btnPrimary,]} onPress={scrollAtTopp}>
            <Text style={globalStyles.btnPrimaryText}>ScrollTop</Text>
          </Pressable>

        </ScrollView>
      </CustomView>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    // paddingBottom: 24,
    paddingHorizontal: 10,
    // flexGrow: 1,
    // flexShrink: 1,
    // flexBasis: 0,
  },
  title: {
    paddingHorizontal: 24,
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,

  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
    paddingHorizontal: 16,
  },
  list: {
    marginTop: 15,
    marginBottom: 24,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  /** card horizontal*/
  cardContainerH: {
    marginTop: 10,
    marginHorizontal: 5,
    width: 120,
    backgroundColor: '#fff',
    // borderWidth:1,
    // borderColor: '#C9D3DB',//C9D3DB
    borderRadius: 8,
    overflow: 'hidden',
    height: 120,
    padding: 10,
  },
  cardImageH: {
    height: 100,
    width: '100%',
    resizeMode: 'contain',
  },


  /* card verical */
  cardContainerV: {
    backgroundColor: '#fff',
    marginTop: 15,
    marginHorizontal: 5,
    padding: 20,
    flex: 1,
    height: 230,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'space-between',
    // alignContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center'
  },
  cardImageV: {
    height: 150,
    width: '100%',
    resizeMode: 'contain',
  },
  cardWrapper: {

  },
  cardImg: {

  },
});
