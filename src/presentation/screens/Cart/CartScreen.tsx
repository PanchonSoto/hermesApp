import { View, Text, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppRootStackParams } from '../../router/AppStackNavigator';
import { Button } from '../../components/ui/Button';






export const CartScreen = () => {

  const  navigation = useNavigation<NavigationProp<AppRootStackParams>>();

  return (

    <View style={{flex:1}}>
      <Text>CartScreen</Text>
      <Button
       onPress={() => navigation.navigate('WishList')}
       text="Wishlist"
      />
    </View>
  );
}
