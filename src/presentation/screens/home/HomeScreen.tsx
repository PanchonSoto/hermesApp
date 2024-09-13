import { Animated, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationProp, useNavigation, useScrollToTop } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';


import { CustomView } from '../../components/ui/CustomView';


import { FakeStoreAPI } from '../../../infrastructure/interfaces/product/fakeStoreApi';

import { HomeScreenStackParams } from '../../router/Stack/HomeStackNavigator';
import { globalStyles, tabStyles } from '../../../config/theme/theme';
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

    <CustomView>
      {/* search bar */}
      <SearchTop />

      <View style={{paddingHorizontal:5,}}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} >

          {/* recently */}
          <View style={styles.list}>
            <Text style={tabStyles.title}>Recently viewed</Text>

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
          <View style={[styles.list, {marginBottom:100,}]}>
            <Text style={tabStyles.title}>All products</Text>

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

                  <Text style={[globalStyles.subtitle,{marginTop:5}]}>
                    {item.title.slice(0, 18)}
                  </Text>


                  <Text style={[styles.listTitle, { marginTop: 2,paddingBottom:5 }]}>${item.price}</Text>
                </View>
              )}
            />

            {/* </View> */}
            <Pressable style={[globalStyles.btnPrimary,]} onPress={scrollAtTopp}>
              <Text style={globalStyles.btnPrimaryText}>ScrollTop</Text>
            </Pressable>
          </View>

        </ScrollView>
      </View>
    </CustomView>

  );
}


const styles = StyleSheet.create({
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
    paddingHorizontal: 16,
  },
  list: {
    // marginTop: 15,
    marginBottom: 10,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,

    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom:5,
    padding: 20,
    // paddingTop:5,
    paddingBottom:10,
    flex: 1,
    height: 230,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center'
  },
  cardImageV: {
    height: 120,
    width: '100%',
    resizeMode: 'contain',
  },
});
