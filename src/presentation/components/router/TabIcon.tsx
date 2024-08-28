import { RouteProp, ParamListBase } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootTabParams } from '../../router/TabNavigator';
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
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Account':
      iconName = focused ? 'person' : 'person-outline';
      break;
    case 'Cart':
      iconName = focused ? 'cart' : 'cart-outline';
      break;
    case 'Menu':
      iconName = focused ? 'grid' : 'grid-outline';
      break;
    default:
      iconName = 'circle';
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
