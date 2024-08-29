import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../gesture-handler';

import { ThemeProvider } from './presentation/context/ThemeContext';

import { TabNavigator } from './presentation/router/Tabs/TabNavigator';




// !App name
//todo use an authprovider instead tabnavigator
export const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TabNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
