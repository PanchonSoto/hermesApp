import { PropsWithChildren, useEffect, useState } from 'react';
import type{ StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';


import { AuthStackNavigator } from '../router/Stack/AuthStackNavigator';
import { RootStackNavigator } from '../router/Tabs/TabNavigator';

import { FullScreenLoader } from '../components/ui/FullScreenLoader';
import { useAuthStore } from '../store/auth/useAuthStore';


type RootStackParams = {
    HomeStack: undefined;
    AuthStack: undefined;
}

export const AuthProvider = ({children}:PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status, token } = useAuthStore();
    // const [isAuthenticated, setIsAuthenticated] = useState('checking');

    useEffect(() => {
        checkStatus();
    }, []);
    console.log({status});



    return (
        <>
            {
               (status === 'authenticated')
                ? <RootStackNavigator />
                : (status === 'checking'
                ? <FullScreenLoader />
                : <AuthStackNavigator/>)
            }
        </>
    );
}
