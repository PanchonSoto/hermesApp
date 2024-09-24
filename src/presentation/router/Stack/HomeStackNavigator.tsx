import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../../screens/home/HomeScreen';
import { ProductScreen } from '../../screens/product/ProductScreen';

import type{ Products } from '../../../domain/entities/productEntity';









export type HomeScreenStackParams = {
  HomeScreen: undefined;
  Product: { product: Products };
}

const HomeStack = createStackNavigator<HomeScreenStackParams>();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Product" component={ProductScreen} options={{ headerShown: true }} />
    </HomeStack.Navigator>
  );
}
