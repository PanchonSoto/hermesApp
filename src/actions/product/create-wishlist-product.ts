import { hermesApi } from "../../config/api/hermesApi";





export const createWishlistProductsByPage = async(productId:number) => {

    try {
        // console.log({created:productId});
        const {data} = await hermesApi.post<any>(`/wishlist/create`,{
            productId,
        });

        // // const products: Product[] = data.serializedProducts.flatMap(product=>product);

        return data;

    } catch (error) {
        console.log({error});
    }

}
