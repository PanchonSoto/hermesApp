export interface ProductResponse {
    serializedProducts: SerializedProduct[];
    limit:              number;
    page:               number;
    total:              number;
    prev:               null;
    next:               string;
}

export interface SerializedProduct {
    id:          number;
    name:        string;
    category_id: number;
    description: string;
    price:       number;
    stock:       number;
    imageurl:    string;
    created_at:  Date;
}
