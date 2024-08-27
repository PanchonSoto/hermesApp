import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../config/theme/theme';
import { CustomView } from '../../components/ui/CustomView';
import { Title } from '../../components/ui/Title';
import { Button } from '../../components/ui/Button';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';


export const HomeScreen = () => {

  const {setTheme, currentTheme, colors} = useContext(ThemeContext);


  return (
    <View>
      <Text>HomeScreen</Text>
      <Icon name="logo-react" size={30} color="#4F8EF7" />

      <CustomView >
      <Title text={`Cambiar thema: ${currentTheme}`} safe/>

      <Button
        text="light"
        onPress={()=>setTheme('light')}
      />

      <View style={{height:10}}/>

      <Button
        text="dark"
        onPress={()=>setTheme('dark')}
      />

      <View style={{height:10}}/>

      <Text style={{color: colors.text}}>
        {JSON.stringify(colors, null, 2)}
      </Text>

    </CustomView>
    </View>
  );
}