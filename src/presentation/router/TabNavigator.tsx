import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";


import { ThemeContext } from "../context/ThemeContext";
import { HomeScreen } from "../screens/home/HomeScreen";
import { AccountScreen } from "../screens/Account/AccountScreen";
import { CartScreen } from "../screens/Cart/CartScreen";
import { MenuScreen } from "../screens/Menu/MenuScreen";
import { TabBarIcon } from "../components/router/TabIcon";




export type RootTabParams = {
    Home: undefined;
    Account: undefined;
    Cart: undefined;
    Menu: undefined;
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

            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 4, }} />
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator>
    );
}

