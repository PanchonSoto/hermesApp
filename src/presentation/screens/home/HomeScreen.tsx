import { NavigationProp, useNavigation } from '@react-navigation/native';


import { CustomView } from '../../components/ui/CustomView';
import { Button } from '../../components/ui/Button';

import { HomeScreenStackParams } from '../../router/Stack/HomeStackNavigator';


export const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<HomeScreenStackParams>>();

  return (
    <CustomView style={{padding:5}}>


      <Button
       text="Go to Products"
       onPress={() => navigation.navigate('Product', { productId: '123' })}
      />

    </CustomView>
  );
}
