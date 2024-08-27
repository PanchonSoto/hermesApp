import '../gesture-handler';

import { ThemeProvider } from './presentation/context/ThemeContext';
import { StackNavigator } from './presentation/navigator/StackNavigator';


// !App name
export const App = () => {
  return (
    <ThemeProvider>
      <StackNavigator/>
    </ThemeProvider>
  );
}
