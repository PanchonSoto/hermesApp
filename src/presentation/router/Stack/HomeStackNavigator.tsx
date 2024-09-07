import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../../screens/home/HomeScreen';
import { ProductScreen } from '../../screens/product/ProductScreen';









export type HomeScreenStackParams = {
  HomeScreen: undefined;
  Product: { productId:string };
}

const HomeStack = createStackNavigator<HomeScreenStackParams>();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Product" component={ProductScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}
