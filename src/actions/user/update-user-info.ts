import { hermesApi } from "../../config/api/hermesApi";
import { UpdateUserRes } from "../../infrastructure/interfaces/user/update-user";



export const updateUserInfo = async(userInfo:any) => {

    try {


        const {data} = await hermesApi.patch<UpdateUserRes>(`/user/info`,{
            updateData: userInfo
        });

        return data;

    } catch (error:any) {
        if (error.response) {
            console.log('Error status:', error.response.status);
            console.log('Error message:', error.response.data.error);

        }
    }

}
