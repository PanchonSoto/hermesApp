import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../gesture-handler';

import { ThemeProvider } from './presentation/context/ThemeContext';
import { StackNavigator } from './presentation/router/StackNavigator';
import { TabNavigator } from './presentation/router/TabNavigator';




// !App name
export const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TabNavigator />
        {/* <StackNavigator/> */}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
