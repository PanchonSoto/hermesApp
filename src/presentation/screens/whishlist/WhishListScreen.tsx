import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';

import { CustomView } from '../../components/ui/CustomView';
import { colors, tabStyles } from '../../../config/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchTop } from '../../components/ui/SearchTop';


import { WishListScreenStackParams } from '../../router/Stack/WishListStackNavigator';
import { Button } from '../../components/ui/Button';

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
        <Image source={{ uri: product.imageUrl }} style={{ width: 150, height: 150, resizeMode: 'cover', }} />
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <Text style={styles.productPrice}>$ {product.price}</Text>

        <View style={styles.contentActions}>

          <Button onPress={()=>{}} text="Delete"
          styles={styles.btn} styleText={styles.btnText} styleContainer={{flex: 1, paddingHorizontal: 6, marginBottom: 5, marginTop: 40, width:'90%', alignSelf:'center'}}/>

          <Button onPress={()=>{}} text="Add to cart"
          styles={styles.btnPrimary} styleText={styles.btnPrimaryText} styleContainer={{flex: 1, paddingHorizontal: 6, marginBottom: 5, width:'90%', alignSelf:'center'}}/>

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
      <SearchTop />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* todo cambiar a customview */}
        <View style={{ paddingHorizontal: 10 }}>

          <Text style={tabStyles.title}>Wishlist</Text>
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
  productContainer: {
    // borderWidth:1,
    // borderColor: 'orange',
    flexDirection: 'row',
    alignContent:'center',
    alignItems:'center',
    // justifyContent: 'space-between',
    marginVertical: 20,
    // paddingHorizontal: 2,
  },
  productImgContainer: {
    // borderWidth:1,
    // borderColor: 'blue',
    // width: '40%',
    flex:1,
    // alignSelf: 'center'
  },
  productInfo: {
    // borderWidth:1,
    // borderColor: 'red',
    // justifyContent: 'flex-start',
    // width: '60%',
    flex:2,
    // paddingHorizontal:10,
    marginLeft:15,
  },
  product: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,

    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
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
