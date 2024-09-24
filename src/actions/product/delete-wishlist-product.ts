import { hermesApi } from "../../config/api/hermesApi";
import { DeleteWishlistResponse } from "../../infrastructure/interfaces/product/wishlistProduct";




export const deleteWishlistProductsByPage = async(productId:number) => {

    try {
        // console.log({deleted:productId});
        const {data} = await hermesApi.delete<DeleteWishlistResponse>(`/wishlist/delete/${productId}`);

        // // const products: Product[] = data.serializedProducts.flatMap(product=>product);

        return data;

    } catch (error) {
        console.log({error});
    }

}
