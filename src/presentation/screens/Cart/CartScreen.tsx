import { View, Text, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Button } from '../../components/ui/Button';
import { CartStackParams } from '../../router/Stack/CartStackNavigator';






export const CartScreen = () => {

  const  navigation = useNavigation<NavigationProp<CartStackParams>>();

  return (

    <View style={{flex:1}}>
      <Text>CartScreen</Text>
      <Button
       onPress={() => console.log('pressed')}
       text="Wishlist"
      />
    </View>
  );
}
