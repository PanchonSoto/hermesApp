import { Alert } from "react-native";
import { hermesApi } from "../../config/api/hermesApi";
import type { AuthCheck, AuthResponse } from "../../infrastructure/interfaces/auth/auth.responses";




export const authCheckStatus = async() => {

    try {
        const {data} = await hermesApi.get<AuthCheck>('/auth/check-status');

        return data;

    } catch (error:any) {

        if (error.response) {
            console.log('Error status:', error.response.status);
            console.log('Error message:', error.response.data);

            // Alert.alert('Error', error.response.data.error);
        } else {
            // Alert.alert('Error', 'Ha ocurrido un error');
        }

        return null;
    }

}

export const authRegister = async(username:string,email:string, password: string) => {

    try {
        email = email.toLowerCase();

        const {data} = await hermesApi.post<AuthResponse>('/auth/register', {
            username,
            email,
            password,
        });

        return data;

    } catch (error:any) {

        if (error.response) {
            console.log('Error status:', error.response.status);
            console.log('Error message:', error.response.data.error);

            Alert.alert('Error', error.response.data.error);
        } else {
            Alert.alert('Error', 'Ha ocurrido un error');
        }

        return null;
    }

}

export const authLogin = async(email:string, password: string) => {

    try {
        email = email.toLowerCase();

        const {data} = await hermesApi.post<AuthResponse>('/auth/login', {
            email,
            password,
        });

        return data;

    } catch (error) {
        console.log(error);
        return null;
    }

}
