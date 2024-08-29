import { createStackNavigator } from '@react-navigation/stack';


import { MenuScreen } from '../../screens/Menu/MenuScreen';













export type CartStackParams = {
  MenuScreen: undefined;
}

const MenuStack = createStackNavigator<CartStackParams>();

export const MenuStackNavigator = () => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
    </MenuStack.Navigator>
  );
}
