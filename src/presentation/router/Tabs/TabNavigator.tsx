import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";


import { ThemeContext } from "../../context/ThemeContext";

import { TabBarIcon } from "../../components/router/TabIcon";

import { CartStackNavigator } from "../Stack/CartStackNavigator";
import { HomeStackNavigator } from "../Stack/HomeStackNavigator";
import { MenuStackNavigator } from "../Stack/MenuStackNavigator";
import { WishListStackNavigator } from "../Stack/WishListStackNavigator";

import { SearchScreen } from "../../screens/search/SearchScreen";
import { useCartStore } from "../../store/products/useCartStore";




export type RootTabParams = {
  HomeStack: undefined;
  WishListStack: undefined;
  CartStack: undefined;
  MenuStack: undefined;
}


const Tab = createBottomTabNavigator<RootTabParams>();

export const TabNavigator = () => {

    const { currentTheme, colors } = useContext(ThemeContext);
    // const { bottom } = useSafeAreaInsets();
    const {top, bottom} = useSafeAreaInsets();
    const { cart } = useCartStore();


    return (
      <Tab.Navigator
          safeAreaInsets={{bottom:bottom, top: top}}
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => (<TabBarIcon routeName={route} color={color} size={size} focused={focused} />),
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.liteColor,
              tabBarStyle: {
                  // paddingTop: 5,
                  // height: 100,
              },
              tabBarLabelStyle: {
                  fontSize: 14,
                  fontWeight: '300',
              },
          })}
      >

          <Tab.Screen name="HomeStack"  component={HomeStackNavigator} options={{ tabBarBadgeStyle:{backgroundColor:'#E91E63'}, tabBarLabel: 'Home', headerShown:false }} />
          <Tab.Screen name="WishListStack" component={WishListStackNavigator} options={{ tabBarLabel: 'Wishlist', headerShown:false }}/>
          <Tab.Screen name="CartStack" component={CartStackNavigator} options={{ tabBarLabel: 'Cart', tabBarBadge: cart.length > 0 ? cart.length : undefined, headerShown:false, }}/>
          <Tab.Screen name="MenuStack" component={MenuStackNavigator} options={{ tabBarLabel: 'Menu', headerShown: false}}/>
      </Tab.Navigator>
    );
}

export type RootStackParams = {
  SearchScreen: undefined;
  // ProductScreen: { productId:string };
  Main: typeof createBottomTabNavigator<RootTabParams>;
}
// Root Stack Navigator
const RootStack = createStackNavigator<RootStackParams>();

export const RootStackNavigator = ()=> {
  return (
    <RootStack.Navigator>
      {/* Tab navigator */}
      <RootStack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* SearchScreen modal screen */}
      <RootStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
            animationEnabled: false,
            headerShown: false,
            presentation: 'modal',
        }}
      />
      {/* <RootStack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          animationEnabled: true,
          headerShown: true,
          animationTypeForReplace: 'push'
          // transitionSpec: {
          //   open: config,
          //   close: config,
          // },
        }}
      /> */}
    </RootStack.Navigator>
  );
}

