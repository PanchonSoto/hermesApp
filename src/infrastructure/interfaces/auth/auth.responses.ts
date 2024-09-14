export interface AuthResponse {
    user:  User;
    token: string;
}

export interface User {
    id:         number;
    username:   string;
    email:      string;
    created_at: Date;
}
