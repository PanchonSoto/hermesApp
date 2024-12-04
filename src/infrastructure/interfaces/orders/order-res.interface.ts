export interface OrderRes {
    userOrders: UserOrder[];
}

export interface UserOrder {
    id:          number;
    user_id:     number;
    total_price: string;
    payment_id:  string;
    order_date:  Date;
    orderitems:  Orderitem[];
}

export interface Orderitem {
    id:         number;
    order_id:   number;
    product_id: number;
    quantity:   number;
    price:      string;
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
