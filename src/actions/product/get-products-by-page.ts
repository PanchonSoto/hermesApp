import { hermesApi } from "../../config/api/hermesApi";
import type{ Product } from "../../domain/entities/productEntity";
import type{ ProductResponse } from "../../infrastructure/interfaces/product/hermesProductApi";
import { ProductMapper } from "../../infrastructure/mapper/product.mapper";



export const getProductsByPage = async(page:number, limit:number=10) => {

    try {

        const {data} = await hermesApi.get<ProductResponse>(`/products?page=${page}&limit=${limit}`);

        // const products: Product[] = data.serializedProducts.flatMap(product=>product);

        // return products;
        // console.log({data});
        const procuts = ProductMapper.productResponseToEntity(data);
        return procuts;

    } catch (error) {
        console.log({error});
    }

}
