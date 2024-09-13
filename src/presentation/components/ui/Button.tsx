import { ActivityIndicator, Insets, Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { useContext } from "react";

import { globalStyles } from "../../../config/theme/theme";
import { ThemeContext } from "../../context/ThemeContext";
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    text?: string;
    styles?: StyleProp<ViewStyle>;
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    iconColor?: string;
    iconSize?:number;
    hitSlop?: Insets;
    rippleColor?: string;
    testID?: string;
    accessibilityLabel?: string;
    styleContainer?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;

    onPress: () => void;
    onLongPress?: () => void;
}

export const Button = ({
    text,
    styles,
    disabled = false,
    loading = false,
    icon,
    iconColor,
    iconSize,
    hitSlop,
    rippleColor,
    testID,
    accessibilityLabel,
    styleContainer,
    styleText,
    onLongPress,
    onPress,
  }: Props) => {

    const { colors } = useContext(ThemeContext);

    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        hitSlop={hitSlop}
        style={({ pressed }) => [
          styleContainer,
          styles,
          {
            opacity: pressed || disabled ? 0.8 : 1,
          }
        ]}
        // android_ripple={{ color: rippleColor || colors.primary }}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      >
        {loading ? (
          <ActivityIndicator color={colors.buttonTextColor} />
        ) : (
          <View>
            {icon && <Icon name={icon} size={iconSize} color={iconColor}/>}
            { text && <Text style={styleText}> {text} </Text> }
          </View>
        )}
      </Pressable>
    );
  };
