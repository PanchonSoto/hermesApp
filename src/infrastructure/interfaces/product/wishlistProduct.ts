export interface DeleteWishlistResponse {
    deletedProduct: DeletedProduct;
}

export interface DeletedProduct {
    id:         number;
    user_id:    number;
    product_id: number;
    added_at:   Date;
    products:   Products;
}

export interface Products {
    id:          number;
    name:        string;
    category_id: number;
    description: string;
    price:       string;
    stock:       number;
    imageurl:    string;
    created_at:  Date;
}
