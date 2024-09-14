import { Platform } from 'react-native';
import axios from 'axios';

import {API_URL as PROD_URL, STAGE, API_URL_IOS, API_URL_ANDROID } from '@env';
import { StorageHelper } from '../helpers/storage-helper';


export const API_URL =
    (STAGE==='prod')
    ? PROD_URL
    : Platform.OS === 'ios'
        ? API_URL_IOS
        : API_URL_ANDROID

const hermesApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});


//todo: Interceptors
hermesApi.interceptors.request.use(
    async (config)=>{
        const token = await StorageHelper.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    }
);

export {
    hermesApi,
}
