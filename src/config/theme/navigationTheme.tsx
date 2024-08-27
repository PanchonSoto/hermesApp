import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';




export const CustomDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#2f3136',
    card: 'rgb(30, 30, 30)',
    text: 'rgb(245, 245, 245)',
    border: 'rgb(55, 55, 55)',
    notification: 'rgb(255, 85, 85)',
  },
};

export const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(240, 240, 240)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
