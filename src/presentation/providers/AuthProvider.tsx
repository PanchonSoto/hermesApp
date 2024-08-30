import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


import { useAuthStore } from '../store/auth/useAuthStore';
import { TabNavigator } from '../router/Tabs/TabNavigator';
import { AuthStackNavigator } from '../router/Stack/AuthStackNavigator';
import { FullScreenLoader } from '../components/ui/FullScreenLoader';


type RootStackParams = {
    HomeStack: undefined;
    AuthStack: undefined;
}

export const AuthProvider = ({children}:PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status } = useAuthStore();
    const [isAuthenticated, setIsAuthenticated] = useState('checking');

    useEffect(() => {
        checkStatus();
    }, []);

    useEffect(() => {
        console.log({status});
      if(status!=='checking'){
        if(status==='authenticated'){
            // navigation.reset({
            //     index:0,
            //     routes: [{name:"HomeStack"}],
            // });
            setIsAuthenticated('authenticated');
        } else {
            // navigation.reset({
            //     index:0,
            //     routes: [{name:"AuthStack"}],
            // });
            setIsAuthenticated('unauthenticated');
        }
      }
    }, [status]);



    return (
        <>
            {
               (isAuthenticated === 'authenticated')
                ? <TabNavigator />
                : (isAuthenticated === 'checking'
                ? <FullScreenLoader />
                : <AuthStackNavigator/>)
            }
        </>
    );
}
