import { hermesApi } from "../../config/api/hermesApi";
import { OrderRes } from "../../infrastructure/interfaces/orders/order-res.interface";





export const getOrdersByPage = async(page:number, limit:number=10) => {

    try {

        const {data} = await hermesApi.get<OrderRes>(`orders/getOrders?page=${page}&limit=${limit}`);

        return data;

    } catch (error) {
        console.log({error});
    }

}
