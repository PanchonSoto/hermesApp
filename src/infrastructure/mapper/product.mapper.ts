import { Product } from "../../domain/entities/productEntity";
import { ProductResponse } from "../interfaces/product/hermesProductApi";



export class ProductMapper {

    static productResponseToEntity(prodcut:ProductResponse):Product{

        return {
            // id: prodcut.serializedProducts.map(p=>p.id),
            // name: prodcut.serializedProducts.map(p=>p.name),
            // category_id: prodcut.serializedProducts.map(p=>p.category_id),
            // description: prodcut.serializedProducts.map(p=>p.description),
            // price: prodcut.serializedProducts.map(p=>p.price),
            // stock: prodcut.serializedProducts.map(p=>p.stock),
            // imageurl: prodcut.serializedProducts.map(p=>p.imageurl),
            // created_at: prodcut.serializedProducts.map(p=>p.created_at),
            products: prodcut.serializedProducts,
            totalProducts: prodcut.total,
        }
    }

}
