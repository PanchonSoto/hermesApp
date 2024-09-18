import '../gesture-handler';

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from './presentation/context/ThemeContext';

//import { TabNavigator } from './presentation/router/Tabs/TabNavigator';
import { AuthProvider } from './presentation/providers/AuthProvider';



const queryClient = new QueryClient();


// !App name
//todo use an authprovider instead tabnavigator
export const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#3F51B5" barStyle="light-content" />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {/* <TabNavigator /> */}
          <AuthProvider />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
