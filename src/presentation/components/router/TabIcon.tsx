import { RouteProp, ParamListBase } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootTabParams } from '../../router/Tabs/TabNavigator';
import { View } from 'react-native';


interface IconProps {
  routeName: RouteProp<RootTabParams, keyof RootTabParams>;
  focused: boolean;
  color: string;
  size: number;
}

export const TabBarIcon = ({ routeName, focused, color, size }: IconProps) => {
  let iconName: string = routeName.name;

  switch (routeName.name) {
    case 'HomeStack':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'WishListStack':
      iconName = focused ? 'heart' : 'heart-outline';
      break;
    case 'CartStack':
      iconName = focused ? 'cart' : 'cart-outline';
      break;
    case 'MenuStack':
      iconName = focused ? 'menu' : 'menu-outline';
      break;
    default:
      iconName = 'apps';
  }


  return (
    <>
      <View style={{ alignItems: 'center' }}>
        {/* Línea superior que aparece solo cuando la pestaña está enfocada */}
        {focused && (
            <View style={{
              height: 3,
              width: 35,
              backgroundColor: color,
              // marginBottom: 7,
              position:'absolute',
              bottom:28,
            }} />
        )}
        <Ionicons
        name={iconName}
        size={size}
        color={color}
        />
      </View>
    </>
    // <Ionicons
    //   name={iconName}
    //   size={size}
    //   color={color}
    // />
  );
};
