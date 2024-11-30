export interface AuthResponse {
    user:  User;
    token: string;
    user_info: UserInfo;
}

export interface User {
    id:         number;
    username:   string;
    email:      string;
    created_at: Date;
}

export interface UserInfo {
    id:               number;
    user_id:          number;
    address:          null | string;
    phone_number:     null | string;
    email:            null | string;
    shipping_address: null | string;
    billing_address:  null | string;
    date_of_birth:    null | Date;
    loyalty_points:   number;
    status:           string;
    created_at:       Date;
    last_updated:     Date;
}


export interface AuthCheck {
    user:      User;
    user_info: UserInfo;
}

export interface UserAuthCheck {
    id:         number;
    email:      string;
    username:   string;
    created_at: Date;
    iat:        number;
    exp:        number;
}
