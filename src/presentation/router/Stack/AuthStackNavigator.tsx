import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../../screens/auth/LoginScreen';
import { RegisterScreen } from '../../screens/auth/RegisterScreen';




export type AuthStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
}

const AuthtStack = createStackNavigator<AuthStackParams>();

export const AuthStackNavigator = () => {
  return (
    <AuthtStack.Navigator>
      <AuthtStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <AuthtStack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }}/>
    </AuthtStack.Navigator>
  );
}
