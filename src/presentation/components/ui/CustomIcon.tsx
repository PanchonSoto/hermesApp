import { StyleProp, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


interface Props {
  name: string;
  size: number;
  color: string;
  style?: StyleProp<TextStyle>;
}

export const CustomIcon = ({name, size, color, style}:Props) => {
  return (
    <Icon name={name} size={size} color={color} style={style}/>
  );
}
