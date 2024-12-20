import { createStackNavigator } from '@react-navigation/stack';


import { MenuScreen } from '../../screens/menu/MenuScreen';
import AdressScreen from '../../screens/account/config/AdressScreen';
import EditAccountScreen from '../../screens/account/config/EditAccountScreen';
import OrdersScreen from '../../screens/account/config/OrdersScreen';



export type MenuStackParams = {
  MenuScreen: undefined;
  AdressScreen: undefined;
  EditAccount: undefined;
  OrdersScreen: undefined;
}

const MenuStack = createStackNavigator<MenuStackParams>();

export const MenuStackNavigator = () => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
      <MenuStack.Screen name="AdressScreen" component={AdressScreen} />
      <MenuStack.Screen name="EditAccount" options={{ headerTitle:"Edit account information", headerBackTitle:"Back"}} component={EditAccountScreen} />
      <MenuStack.Screen name="OrdersScreen" options={{ headerTitle:"My orders", headerBackTitle:"Back"}} component={OrdersScreen} />
    </MenuStack.Navigator>
  );
}
