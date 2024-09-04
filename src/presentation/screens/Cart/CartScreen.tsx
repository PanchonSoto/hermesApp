import { View, Text, Pressable, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { CartStackParams } from '../../router/Stack/CartStackNavigator';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { CustomView } from '../../components/ui/CustomView';
import { colors, globalStyles } from '../../../config/theme/theme';




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
  { id: 4, name: 'Smartphone iPhone 13 Pro Max Negro Apple 256GB', price: 100, imageUrl: 'https://m.media-amazon.com/images/I/51UtM-A3fdL.jpg' },
  { id: 5, name: 'Samsung Galaxy S24 Ultra 6.8" Dual SIM, 256GB, 12GB RAM, Gris', price: 200, imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/mx/2401/gallery/mx-galaxy-s24-s928-sm-s928bzkmltm-539300146?$650_519_PNG$' },
  { id: 6, name: 'Samsung Galaxy S24 Ultra 6.8" Dual SIM, 256GB, 12GB RAM, Gris', price: 200, imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/mx/2401/gallery/mx-galaxy-s24-s928-sm-s928bzkmltm-539300146?$650_519_PNG$' },
  { id: 7, name: 'Smartphone iPhone 13 Pro Max Negro Apple 256GB', price: 100, imageUrl: 'https://m.media-amazon.com/images/I/51UtM-A3fdL.jpg' },
  { id: 8, name: 'Samsung Galaxy S24 Ultra 6.8" Dual SIM, 256GB, 12GB RAM, Gris', price: 200, imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/mx/2401/gallery/mx-galaxy-s24-s928-sm-s928bzkmltm-539300146?$650_519_PNG$' },
  { id: 9, name: 'Samsung Galaxy S24 Ultra 6.8" Dual SIM, 256GB, 12GB RAM, Gris', price: 200, imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/mx/2401/gallery/mx-galaxy-s24-s928-sm-s928bzkmltm-539300146?$650_519_PNG$' },
  // Add more products as needed
];



export const CartScreen = () => {

  const navigation = useNavigation<NavigationProp<CartStackParams>>();


  const WishlistItem = ({ product }: { product: Product }) => (
    <View style={styles.product}>

      <View style={styles.productContainer}>

        <View style={styles.productImgContainer}>
          <Image source={{ uri: product.imageUrl }} style={{ width: 100, height: 100, resizeMode: 'cover' }} />
        </View>

        <View style={styles.productInfo}>

          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productPrice}>$ {product.price}</Text>


          <View style={styles.contentActions}>
            {/* btn rest */}
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={{ alignSelf: 'flex-end', backgroundColor: '#F3F2F7', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>
              <View style={[styles.btn,]}>
                <CustomIcon
                  name="remove"
                  size={16}
                  color="#000"
                />
              </View>
            </Pressable>
            {/* counter */}
            <View style={{ alignSelf: 'flex-end', backgroundColor: '#F3F2F7' }}>
              <Text style={[styles.btn, { fontWeight: '600', color: '#000' }]}>1</Text>
            </View>
            {/* btn add */}
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={{ alignSelf: 'flex-end', backgroundColor: '#F3F2F7', borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
              <View style={styles.btn}>
                <CustomIcon
                  name="add"
                  size={16}
                  color="#000"
                />
              </View>
            </Pressable>

            <View style={{ flex: 1 }} />
            {/* btn delete */}
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={{ backgroundColor: '#F3F2F7', borderRadius: 8, borderBottomRightRadius: 8, marginRight: 5 }}>
              <View style={styles.btn}>
                <CustomIcon
                  name="trash-outline"
                  size={16}
                  color="red"
                />
              </View>
            </Pressable>


          </View>
        </View>
      </View>

    </View>

  );

  return (
    <CustomView style={{ flex: 1, }}>

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

      <CustomView style={{ paddingHorizontal: 15 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={styles.title}>Your Cart (3)</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.title}>Total:{' '}
            <Text style={{ color: colors.primary }}>1400</Text>
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <WishlistItem product={item} />}
            scrollEnabled={false}
            style={{ marginBottom: 20 }}
          />

          {/* summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary:</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <Pressable
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Products total:</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowLabel}>$1400</Text>
                </Pressable>
              </View>
              <View style={styles.rowWrapper}>
                <Pressable
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Shipping:</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowLabel}>$10</Text>
                </Pressable>
              </View>
              <View style={styles.rowWrapper}>
                <Pressable
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Subtotal:</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowLabel}>$1410</Text>
                </Pressable>
              </View>
              <View style={[styles.rowWrapper, styles.rowLast]}>
                <Pressable
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <Text style={styles.rowLabel}>Total (taxes included):</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowLabel}>$1410</Text>
                </Pressable>
              </View>
            </View>

          </View>

          {/* checkout */}
          <View style={styles.checkoutAction}>
            <Pressable
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.btnCheckout}>
                <Text style={styles.btnCheckoutText}>Proced to checkout</Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>

      </CustomView>

    </CustomView>
  );
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 16,
  },

  /* products */
  product: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    // elevation: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    // textAlign: 'left',
    // paddingHorizontal: 10,
  },
  productPrice: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    // paddingHorizontal: 10,
    paddingTop: 5,
  },
  productContainer: {
    // borderWidth:1,
    // borderColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  productImgContainer: {
    // borderWidth:1,
    // borderColor: 'blue',
    width: '25%',
    alignSelf: 'center'
  },
  productInfo: {
    // borderWidth:1,
    // borderColor: 'red',
    justifyContent: 'flex-start',
    width: '75%',
  },

  /* botones */
  contentActions: {
    marginTop: 10,
    flexDirection: 'row',
    // borderWidth:1,
    borderColor: 'red',
    flex: 1,
    // marginTop: 90,
  },
  btn: {
    // flexDirection: 'row',
    // backgroundColor: '#F3F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    // borderRadius: 8,
    // paddingVertical: 8,
    // paddingHorizontal: 16,
    // borderWidth: 1,
    width: 40,
    height: 30,
    // borderColor: 'red',
  },

  /* summary */
  section: {
    // justifyContent:'flex-end',
    // alignContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  sectionBody: {
    borderRadius: 12,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 1,
  },
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 5,
  },
  rowWrapper: {
    // borderWidth:1,
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
    // borderWidth:1,
    // flexDirection: 'row',
  },
  rowFirst: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,

  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  rowSpacer: {
    // borderWidth:1,
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowLast: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 50,
  },

  /* checkout */
  checkoutAction:{
    marginBottom:30,
  },
  btnCheckout:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8,
    paddingVertical:8,
    paddingHorizontal:16,
    borderWidth:1,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  btnCheckoutText:{
    fontSize:17,
    lineHeight:24,
    fontWeight:'600',
    color:'#fff',
  }



})
