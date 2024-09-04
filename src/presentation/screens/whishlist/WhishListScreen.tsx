import React from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';

import { WishListScreenStackParams } from '../../router/Stack/WishListStackNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { CustomView } from '../../components/ui/CustomView';
import { colors, globalStyles } from '../../../config/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const products: Product[] = [
  { id: 1, name: 'Smartphone iPhone 13 Pro Max Negro Apple 256GB', price: 100, imageUrl: 'https://m.media-amazon.com/images/I/51UtM-A3fdL.jpg' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra 6.8" Dual SIM, 256GB, 12GB RAM, Gris', price: 200, imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/mx/2401/gallery/mx-galaxy-s24-s928-sm-s928bzkmltm-539300146?$650_519_PNG$' },
  { id: 3, name: 'Samsung Galaxy S24 Ultra 6.8" Dual SIM, 256GB, 12GB RAM, Gris', price: 200, imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/mx/2401/gallery/mx-galaxy-s24-s928-sm-s928bzkmltm-539300146?$650_519_PNG$' },
  // Add more products as needed
];

const WishlistItem = ({ product }: { product: Product }) => (
  <View style={styles.product}>

    <View style={styles.productContainer}>
      <View style={styles.productImgContainer}>
        <Image source={{ uri: product.imageUrl }} style={{ width: 170, height: 200, resizeMode: 'cover' }} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <Text style={styles.productPrice}>$ {product.price}</Text>

        <View style={styles.contentActions}>
          <Pressable
            onPress={() => {
              // handle onPress
            }}
            style={{ flex: 1, paddingHorizontal: 6, marginBottom: 5, marginTop: 40 }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Delete</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              // handle onPress
            }}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Add to cart</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>

  </View>

);

export const WhishListScreen: React.FC = () => {

  const navigation = useNavigation<NavigationProp<WishListScreenStackParams>>();

  return (



    <CustomView>
      {/* search bar */}
      <View style={styles.searchWrapper}>
        <Pressable onPress={() => console.log('Search')}>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <CustomIcon
                color="#848484"
                name="search"
                size={17}
              />
            </View>

            <View style={styles.searchControl}>
              <Text>Search in HermesHub...</Text>
            </View>
          </View>
        </Pressable>
      </View>
      <ScrollView>
        {/* todo cambiar a customview */}
        <View style={{ paddingHorizontal: 20 }}>

          <Text style={styles.title}>Wishlist</Text>
          <Pressable
            onPress={() => navigation.navigate('Product', { productId: '123' })}>

            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <WishlistItem product={item} />}
              scrollEnabled={false}
            />

          </Pressable>
        </View>
      </ScrollView>
    </CustomView>


  );
};


const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  search: {
    position: 'relative',
    backgroundColor: '#efefef',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#3F51B5',
  },
  searchWrapper: {
    paddingTop: 15,
    paddingHorizontal: 16,
    paddingBottom: 15,
    // marginTop: 5,
    borderBottomWidth: 1,
    borderColor: '#3F51B5', //efefef
    backgroundColor: '#3F51B5',
    width: '100%'
  },
  searchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: '100%',
    fontSize: 16,
    fontWeight: '500'
  },
  productContainer: {
    // borderWidth:1,
    // borderColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  productImgContainer: {
    // borderWidth:1,
    // borderColor: 'blue',
    width: '40%',
    alignSelf: 'center'
  },
  productInfo: {
    // borderWidth:1,
    // borderColor: 'red',
    justifyContent: 'flex-start',
    width: '60%',
  },
  products: {
    // borderRadius:8,
    // marginBottom:20,
  },
  product: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  productPrice: {
    color: 'red',
    fontWeight: '300',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  contentActions: {
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 18,
    marginBottom: 0,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'red',
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: 'red',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#fff',
  },

});
