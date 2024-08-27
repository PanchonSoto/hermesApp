import { ActivityIndicator, Insets, Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import { useContext } from "react";

import { globalStyles } from "../../../config/theme/theme";
import { ThemeContext } from "../../context/ThemeContext";
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    text: string;
    styles?: StyleProp<ViewStyle>;
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
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
          globalStyles.btnPrimary,
          {
            opacity: pressed || disabled ? 0.8 : 1,
            backgroundColor: disabled ? colors.disabled : colors.primary
          }
        ]}
        android_ripple={{ color: rippleColor || colors.primary }}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      >
        {loading ? (
          <ActivityIndicator color={colors.buttonTextColor} />
        ) : (
          <>
            {icon && <Icon name={icon} />}
            <Text style={[
              globalStyles.btnPrimaryText,
              styleText,
              { color: colors.text }
            ]}>
              {text}
            </Text>
          </>
        )}
      </Pressable>
    );
  };
