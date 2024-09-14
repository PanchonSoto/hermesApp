import { hermesApi } from "../../config/api/hermesApi";
import type { AuthResponse } from "../../infrastructure/interfaces/auth/auth.responses";



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
