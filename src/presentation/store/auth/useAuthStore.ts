import { create } from "zustand";
// import { User } from "../../domain/entities/entities/user";
// import { AuthStatus } from "../../infrastructure/interfaces/auth.status";
// import { authCheckStatus, authLogin } from "../../actions/auth/auth";
import { StorageHelper } from "../../../config/helpers/storage-helper";
import { authLogin } from "../../../actions/auth/auth";

import { User } from '../../../infrastructure/interfaces/auth/auth.responses';


type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email:string, password:string) => Promise<boolean>;
    checkStatus: ()=>Promise<void>;
    logout: ()=>Promise<void>;
}




const testUser:User = { id:1,email:'panshibe@gmail.com',username:'Panshibe', created_at: new Date() };
const tokenTest = 'tokenTest123';

export const useAuthStore = create<AuthState>()((set,get)=>({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async(email:string, password:string)=>{
        const res = await authLogin(email, password);
        if(!res) {
            set({status:'unauthenticated', token:undefined, user:undefined});
            return false;
        }

        await StorageHelper.setItem('token', res.token);

        set({status:'authenticated', token:res.token, user:res.user});
        return true;

        //!local test
        // setTimeout(async() => {
        //     await StorageHelper.setItem('token', tokenTest);
        //     set({status:'authenticated', token:tokenTest, user:testUser});
        // }, 500);
        // return true;

    },
    checkStatus: async() => {
        //Todo create endpoint that verify the jwt
        // const res = await authCheckStatus();
        // if(!res) {
        //     set({status:'unauthenticated', token:undefined, user:undefined});
        //     return;
        // }
        // await StorageHelper.setItem('token', res.token);
        // set({status:'authenticated', token:res.token, user:res.user});

        //!local test
        setTimeout(async() => {
            const isAuthToken = await StorageHelper.getItem('token');
            if(isAuthToken) {
                set({status:'authenticated', token:isAuthToken});

            } else {
                set({status:'unauthenticated', token:undefined, user:undefined});
            }
        }, 1000);

    },
    logout: async()=> {
        await StorageHelper.removeItem('token');
        set({status:'unauthenticated', token:undefined, user:undefined});
    },
}));
