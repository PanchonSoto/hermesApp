import { View, Text, StyleSheet, Image } from 'react-native';

import{ type CartProduct, useCartStore, } from '../../store/products/useCartStore';
import type{ Products } from '../../../domain/entities/productEntity';
import { Button } from '../ui/Button';



interface Props {
    product: CartProduct
}


const CartProducts = ({product}:Props) => {

    const { cart, addProductToCart, deleteProductCart } = useCartStore();


    const onCartProduct = (product:Products,quantity:number)=> {
      addProductToCart(product,quantity);
    }

    const onDeleteCartProduct = (id:number) => {
      deleteProductCart(id);
    }

  return (
    <View style={styles.product}>

      <View style={styles.productContainer}>

        <View style={styles.productImgContainer}>
          <Image source={{ uri: product.imageurl }} style={{ width: 100, height: 100, resizeMode: 'contain', }} />
        </View>

        <View style={styles.productInfo}>

          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productPrice}>$ {product.price}</Text>


          <View style={styles.contentActions}>

            {/* btn rest */}
            <Button
              styles={styles.btn}
              styleContainer={{  backgroundColor: '#efefef', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, }}
              text=""
              onPress={() => { onCartProduct(product, -1) }}
              icon="remove"
              iconSize={16}
              iconColor="#000"
            />
            {/* counter */}
            <View style={[{ backgroundColor: '#efefef' }, styles.btn,]}>
              <Text style={[ { fontWeight: '600', color: '#000' }]}>{product.quantity}</Text>
            </View>
            {/* btn add */}
            <Button
              styles={styles.btn}
              styleContainer={{  backgroundColor: '#efefef', borderTopRightRadius: 8, borderBottomRightRadius: 8, }}
              text=""
              onPress={() => { onCartProduct(product, +1) }}
              icon="add"
              iconSize={16}
              iconColor="#000"
            />

            <View style={{ flex: 1 }} />
            {/* btn delete */}
            <Button
              styles={styles.btn}
              styleContainer={{ backgroundColor: '#efefef', borderRadius: 8, borderBottomRightRadius: 8, marginRight: 5 }}
              text=""
              onPress={() => onDeleteCartProduct(product.id)}
              icon="trash-outline"
              iconSize={16}
              iconColor="red"
            />


          </View>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    /* products */
    product: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 1,

      // paddingHorizontal:5,
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
      // width: '25%',
      alignSelf: 'center',
      alignItems:'center',
      flex: 1,
      paddingHorizontal:5,
    },
    productInfo: {
      // borderWidth:1,
      // borderColor: 'red',
      // justifyContent: 'flex-start',
      // width: '75%',
      flex: 3,
      paddingHorizontal:5,
      // marginLeft:15,
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
      width: 35,
      height: 35,
      // borderColor: 'red',
    },
});

export default CartProducts;
