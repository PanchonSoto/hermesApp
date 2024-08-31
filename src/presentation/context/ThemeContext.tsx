import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Appearance, AppState, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { darkColors, lightColors, ThemeColors } from "../../config/theme/theme";
import { CustomDarkTheme, CustomDefaultTheme } from '../../config/theme/navigationTheme';



type ThemeColor = 'light' | 'dark';

interface ThemeContextProps {
    currentTheme: ThemeColor;
    colors: ThemeColors;
    isDark: boolean;

    setTheme: (theme: ThemeColor)=>void;
}




export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({children}:PropsWithChildren) => {

    const colorScheme = useColorScheme();
    const [currentTheme, setcurrentTheme] = useState<ThemeColor>('light');
    const isDark = currentTheme==='dark';
    const colors = isDark ? darkColors : lightColors;

    useEffect(() => {
        // setcurrentTheme(colorScheme ?? 'light');
        setcurrentTheme('light');
    }, [colorScheme]);



    const setTheme = (theme:ThemeColor)=> {
        setcurrentTheme(theme);
    }

    return (
        <NavigationContainer theme={isDark ? CustomDarkTheme:CustomDefaultTheme}>
            <ThemeContext.Provider value={{
             currentTheme: currentTheme,
             isDark: isDark,
             colors: colors,
             setTheme: setTheme,
            }}>
                { children }
            </ThemeContext.Provider>
      </NavigationContainer>
    )
}
