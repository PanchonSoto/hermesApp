import { PropsWithChildren, useContext } from 'react';
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../../config/theme/theme';
import { ThemeContext } from '../../context/ThemeContext';


interface Props extends PropsWithChildren{
  text: string;
  backgroundcolor?: string;
  safe?: boolean;
}

export const SubTitle = ({text, safe=false, backgroundcolor}:Props) => {

  const { top } = useSafeAreaInsets();
  const {colors} = useContext(ThemeContext);

  return (
    <Text style={{
        ...globalStyles.subTitle,
        marginTop: safe ? top : 0,
        marginBottom:10,
        backgroundColor: colors.cardBackground ?? backgroundcolor,
        color: colors.liteColor
    }}>
        { text }
    </Text>
  )
}
