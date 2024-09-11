import { createStackNavigator } from '@react-navigation/stack';

import { WhishListScreen } from '../../screens/whishlist/WhishListScreen';
import { ProductScreen } from '../../screens/product/ProductScreen';









export type WishListScreenStackParams = {
  WishList: undefined;
  Product: { productId: string };
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
