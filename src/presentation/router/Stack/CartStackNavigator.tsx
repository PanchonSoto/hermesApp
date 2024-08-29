import { createStackNavigator } from '@react-navigation/stack';

import { CartScreen } from '../../screens/cart/CartScreen';











export type CartStackParams = {
  CartScreen: undefined;
}

const CartStack = createStackNavigator<CartStackParams>();

export const CartStackNavigator = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
    </CartStack.Navigator>
  );
}
