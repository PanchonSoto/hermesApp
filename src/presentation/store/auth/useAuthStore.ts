import { create } from "zustand";
// import { User } from "../../domain/entities/entities/user";
// import { AuthStatus } from "../../infrastructure/interfaces/auth.status";
// import { authCheckStatus, authLogin } from "../../actions/auth/auth";
import { StorageHelper } from "../../../config/helpers/storage-helper";
import { authCheckStatus, authLogin, authRegister } from "../../../actions/auth/auth";
import { updateUserInfo } from "../../../actions/user/update-user-info";

import type{ User, UserInfo } from '../../../infrastructure/interfaces/auth/auth.responses';


type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
    userInfo?: UserInfo;

    register: (username:string,email:string,password:string)=>Promise<boolean>;
    login: (email:string, password:string) => Promise<boolean>;
    checkStatus: ()=>Promise<void>;
    logout: ()=>Promise<void>;

    updateUser: (userInfo:any)=>Promise<boolean>;
}




const testUser:User = { id:1,email:'panshibe@gmail.com',username:'Panshibe', created_at: new Date() };
const tokenTest = 'tokenTest123';

export const useAuthStore = create<AuthState>()((set,get)=>({
    status: 'checking',
    token: undefined,
    user: undefined,
    userInfo: undefined,


    register: async(username, email, password)=>{
        const res = await authRegister(username,email,password);
        if(!res) {
            set({status:'unauthenticated', token:undefined, user:undefined});
            return false;
        }
        console.log({res});
        await StorageHelper.setItem('token', res.token);
        set({status:'authenticated', token:res.token, user:res.user, userInfo:res.user_info});
        return true;
    },

    login: async(email:string, password:string)=>{
        const res = await authLogin(email, password);
        if(!res) {
            set({status:'unauthenticated', token:undefined, user:undefined});
            return false;
        }

        await StorageHelper.setItem('token', res.token);

        set({status:'authenticated', token:res.token, user:res.user, userInfo:res.user_info});
        return true;

        //!local test
        // setTimeout(async() => {
        //     await StorageHelper.setItem('token', tokenTest);
        //     set({status:'authenticated', token:tokenTest, user:testUser});
        // }, 500);
        // return true;

    },
    checkStatus: async() => {

        //? not token not request to backend
        const storageToken = await StorageHelper.getItem('token');
        if(!storageToken) {
            set({status:'unauthenticated', token:undefined, user:undefined});
            return;
        }

        //? check stored token in backend
        const res = await authCheckStatus();

        if(!res) {
            set({status:'unauthenticated', token:undefined, user:undefined, userInfo:undefined});
            return;
        }
        // const user: User = {id:res.user.id, username: res.user.username, email:res.user.email, created_at:res.user.email }
        // await StorageHelper.setItem('token', res.token);
        set({status:'authenticated', user:res.user, userInfo:res.user_info});

        //!local test
        // setTimeout(async() => {
        //     const isAuthToken = await StorageHelper.getItem('token');
        //     if(isAuthToken) {
        //         set({status:'authenticated', token:isAuthToken});

        //     } else {
        //         set({status:'unauthenticated', token:undefined, user:undefined});
        //     }
        // }, 200);

    },
    logout: async()=> {
        await StorageHelper.removeItem('token');
        set({status:'unauthenticated', token:undefined, user:undefined});
    },

    updateUser: async(userInfo) => {
        const currentUser = get().user;
        const res = await updateUserInfo(userInfo);
        if(!res) {
            return false;
        }

        set({userInfo:res.updatedUserInfo, user: (res.updateUser)?res.updateUser: currentUser});
        return true;

    },
}));
