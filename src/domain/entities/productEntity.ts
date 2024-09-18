


export interface Product {
    products: Products[];
    totalProducts: number;
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
