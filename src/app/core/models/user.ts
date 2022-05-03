export enum UserType {
    ADMIN = 'ADMIN',
    MERCHANT = 'MERCHANT',
    STAFF = 'STAFF',
    CUSTOMER = 'CUSTOMER'
}

export class User {
    id?: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    is_verified?: boolean;
    last_login?: string;
    is_superuser?: boolean;
    is_staff?: boolean;
    is_active?: boolean;
    is_loggedin?: boolean;
    password?: string;
    token?: string;
    refresh?: string;
    email?: string;
    phone_number?: string;
    user_type?: string
    date_created?: string;
    date_updated?: string;
    auth_provider?: string;
    groups?: [];
    user_permissions?: [];
}

export class Address {
    id: string;
    country: string;
    city: string;
    street_address: string;
    postal_code: string;
    primary: boolean;
    building_number: string;
    apartment_number: string;
    date_created: string;
    date_updated: string;
}