import '../gesture-handler';

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { StripeProvider } from '@stripe/stripe-react-native';

import { ThemeProvider } from './presentation/context/ThemeContext';

//import { TabNavigator } from './presentation/router/Tabs/TabNavigator';
import { AuthProvider } from './presentation/providers/AuthProvider';



const queryClient = new QueryClient();


// !App name
//todo use an authprovider instead tabnavigator
export const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51QIZoPFpr5LXyTyMk9o8FpHwwQLtxBXx0wXYfHiHYg7rJxZ61eASEfP8xDzvbJXtuc9S1rkNv9fHBNbS3p3rIDmB00r9U2Rxr3">
      <SafeAreaProvider>
        <StatusBar backgroundColor="#3F51B5" barStyle="default" />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            {/* <TabNavigator /> */}
            <AuthProvider />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </StripeProvider>
  );
}
