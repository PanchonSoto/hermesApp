import { createStackNavigator } from '@react-navigation/stack';


import { MenuScreen } from '../../screens/menu/MenuScreen';













export type MenuStackParams = {
  MenuScreen: undefined;
}

const MenuStack = createStackNavigator<MenuStackParams>();

export const MenuStackNavigator = () => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
    </MenuStack.Navigator>
  );
}
