import '../gesture-handler';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from './presentation/context/ThemeContext';

//import { TabNavigator } from './presentation/router/Tabs/TabNavigator';
import { AuthProvider } from './presentation/providers/AuthProvider';




// !App name
//todo use an authprovider instead tabnavigator
export const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {/* <TabNavigator /> */}
        <AuthProvider />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
