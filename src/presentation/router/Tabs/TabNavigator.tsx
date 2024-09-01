import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";


import { ThemeContext } from "../../context/ThemeContext";

import { TabBarIcon } from "../../components/router/TabIcon";

import { HomeStackNavigator } from "../Stack/HomeStackNavigator";
import { WishListStackNavigator } from "../Stack/WishListStackNavigator";
import { CartStackNavigator } from "../Stack/CartStackNavigator";
import { MenuStackNavigator } from "../Stack/MenuStackNavigator";




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




    return (
        <Tab.Navigator
            safeAreaInsets={({bottom:bottom+5})}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => (<TabBarIcon routeName={route} color={color} size={size} focused={focused} />),
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.liteColor,
                tabBarStyle: {
                    // paddingTop: 5,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '300',
                },
            })}
        >

            <Tab.Screen name="HomeStack"  component={HomeStackNavigator} options={{ tabBarBadgeStyle:{backgroundColor:'#E91E63'}, tabBarLabel: 'Home', headerShown:false }} />
            <Tab.Screen name="WishListStack" component={WishListStackNavigator} options={{ tabBarLabel: 'Wishlist', headerShown:false }}/>
            <Tab.Screen name="CartStack" component={CartStackNavigator} options={{ tabBarLabel: 'Cart', tabBarBadge: 4, }}/>
            <Tab.Screen name="MenuStack" component={MenuStackNavigator} options={{ tabBarLabel: 'Menu' }}/>
        </Tab.Navigator>
    );
}

