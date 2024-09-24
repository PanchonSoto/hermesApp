import { hermesApi } from "../../config/api/hermesApi";
import { WishlistResponse } from "../../domain/entities/productEntity";



export const getWishlistProductsByPage = async(page:number, limit:number=10) => {

    try {

        const {data} = await hermesApi.get<WishlistResponse>(`/wishlist?page=${page}&limit=${limit}`);

        // const products: Product[] = data.serializedProducts.flatMap(product=>product);

        return data;

    } catch (error) {
        console.log({error});
    }

}
