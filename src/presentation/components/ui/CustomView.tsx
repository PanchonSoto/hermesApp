import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode, useContext } from 'react'
import { globalStyles } from '../../../config/theme/theme'
import { ThemeContext } from '../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface Props {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  margin?: boolean;
}


export const CustomView = ({children, style, margin=false}:Props) => {

  const { top, bottom } = useSafeAreaInsets();

  const { colors } = useContext(ThemeContext);

  return (
    <View style={[
      globalStyles.mainContainer, style,
      margin ? globalStyles.globalMargin : null,
      { backgroundColor: colors.background,  paddingTop:top, },
    ]}>
      {children}
    </View>
  )
}

