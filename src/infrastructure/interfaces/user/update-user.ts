export interface UpdateUserRes {
    updateUser:      UpdateUser;
    updatedUserInfo: UpdatedUserInfo;
}

export interface UpdateUser {
    id:         number;
    username:   string;
    email:      string;
    password:   string;
    created_at: Date;
}

export interface UpdatedUserInfo {
    id:               number;
    user_id:          number;
    address:          null;
    phone_number:     string;
    email:            string;
    shipping_address: null;
    billing_address:  null;
    date_of_birth:    null;
    loyalty_points:   number;
    status:           string;
    created_at:       Date;
    last_updated:     Date;
}
