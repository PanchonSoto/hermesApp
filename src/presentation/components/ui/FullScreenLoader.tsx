import { ActivityIndicator } from 'react-native';
import { CustomView } from './CustomView';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';





export const FullScreenLoader = () => {

    const { colors } = useContext(ThemeContext);

  return (
    <CustomView style={{justifyContent:'center'}}>
        <ActivityIndicator size={40} color={colors.primary}/>
    </CustomView>
  )
}

