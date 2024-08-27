import { useContext } from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native'

import { ThemeContext } from '../../context/ThemeContext';



interface Props {
    style?: StyleProp<ViewStyle>;
}



export const Separator = ({style}:Props) => {

  const {colors} = useContext(ThemeContext);

  return (
    <View style={{backgroundColor: colors.cardBackground}}>
        <View style={[
        {
            alignSelf: 'center',
            width: '100%',
            height:1,
            backgroundColor: colors.text,
            opacity:0.1,
            marginVertical: 8,
        },
        style
        ]}>
            <Text>Separator</Text>
        </View>
    </View>
  )
}
