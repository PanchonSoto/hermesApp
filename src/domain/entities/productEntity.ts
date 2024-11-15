
export interface WishlistResponse {
    total:    number;
    wishlist: Wishlist[];
}

export interface Wishlist {
    id:         number;
    user_id:    number;
    product_id: number;
    added_at:   Date;
    products:   Products;
}

export interface Product {
    products: Products[];
    totalProducts: number;
}

export interface Products {
    id:          number;
    name:        string;
    category_id: number;
    description: string;
    price:       number;
    stock:       number;
    imageurl:    string;
    created_at:  Date;
}
