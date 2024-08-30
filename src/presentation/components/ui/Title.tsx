import { View, Text, StyleProp, TextStyle } from 'react-native';
import { globalStyles } from '../../../config/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';


interface Props {
  text: string;
  safe?: boolean;
  white?: boolean;
  styles?: StyleProp<TextStyle>;

}

export const Title = ({text, safe, white,styles}:Props) => {

  const {top} = useSafeAreaInsets();
  const { colors } = useContext(ThemeContext);

  return (
    <Text style={[
        styles,
        {
          ...globalStyles.title,
          marginTop: safe ? top : 0,
          marginBottom: 10,
          color: white ? 'white' : colors.text,
        }
    ]}>
        { text }
    </Text>
  )
}
