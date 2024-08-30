import { create } from "zustand";
// import { User } from "../../domain/entities/entities/user";
// import { AuthStatus } from "../../infrastructure/interfaces/auth.status";
// import { authCheckStatus, authLogin } from "../../actions/auth/auth";
import { StorageHelper } from "../../../config/helpers/storage-helper";


type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: {email:string,password:string };

    login: (email:string, password:string) => Promise<boolean>;
    checkStatus: ()=>Promise<void>;
    logout: ()=>Promise<void>;
}




const testUser = { email:'panshibe@gmail.com', password:'123456' };
const tokenTest = 'tokenTest123';

export const useAuthStore = create<AuthState>()((set,get)=>({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async(email:string, password:string)=>{
        // const res = await authLogin(email, password);
        // if(!res) {
        //     set({status:'authenticated', token:undefined, user:undefined});
        //     return false;
        // }

        // await StorageHelper.setItem('token', res.token);

        // set({status:'authenticated', token:res.token, user:res.user});
        setTimeout(async() => {
            await StorageHelper.setItem('token', tokenTest);
            set({status:'authenticated', token:tokenTest, user:testUser});
        }, 500);

        return true;

    },
    checkStatus: async() => {
        // const res = await authCheckStatus();
        // if(!res) {
        //     set({status:'unauthenticated', token:undefined, user:undefined});
        //     return;
        // }
        // await StorageHelper.setItem('token', res.token);
        // set({status:'authenticated', token:res.token, user:res.user});
        setTimeout(async() => {
            const isAuthToken = await StorageHelper.getItem('token');
            if(isAuthToken) {
                set({status:'authenticated', token:tokenTest, user:testUser});

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
