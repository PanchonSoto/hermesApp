import { createStackNavigator } from '@react-navigation/stack';


import { WhishListScreen } from '../../screens/wishlist/WishlistScreen';
import { ProductScreen } from '../../screens/product/ProductScreen';

import type{ Products } from '../../../domain/entities/productEntity';









export type WishListScreenStackParams = {
  WishList: undefined;
  Product: { product: Products };
}

const WishListStack = createStackNavigator<WishListScreenStackParams>();

export const WishListStackNavigator = () => {
  return (
    <WishListStack.Navigator
     //?CONFIG
     /* initialRouteName='HomeScreen'
     screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white'
      },
     }} */
    >
      <WishListStack.Screen name="WishList" component={WhishListScreen} options={{headerShown:false}}/>
      <WishListStack.Screen name="Product" component={ProductScreen} options={{gestureDirection:'horizontal-inverted',}}/>
    </WishListStack.Navigator>
  );
}
