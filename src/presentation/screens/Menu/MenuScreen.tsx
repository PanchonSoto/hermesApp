import { useContext } from "react";
import { View, Text } from "react-native";

import { CustomView } from "../../components/ui/CustomView"
import { Title } from "../../components/ui/Title";
import { Button } from "../../components/ui/Button";
import { ThemeContext } from "../../context/ThemeContext";
import { useAuthStore } from "../../store/auth/useAuthStore";


export const MenuScreen = () => {

  const { setTheme, currentTheme, colors } = useContext(ThemeContext);
  const { logout } = useAuthStore();



  return (
    <CustomView>

      <Title text={`Cambiar thema: ${currentTheme}`} safe />

      <Button
        text="light"
        onPress={() => setTheme('light')}
      />

      <View style={{ height: 10 }} />
      <Button
        text="dark"
        onPress={() => setTheme('dark')}
      />

      <View style={{ height: 10 }} />
      <Button
        text="Logout"
        onPress={logout}
      />

      <View style={{ height: 10 }} />
      <Text style={{ color: colors.liteColor }}>
        {JSON.stringify(colors, null, 2)}
      </Text>

    </CustomView>
  )
}
