export interface ApiLogs {

    
}
export interface LogResponse {
    id:         number;
    method:     string;
    date:       Date;
    data:       Data[];
    created_at: Date;
    updated_at: Date;
}

export interface Data {
    id:      number;
    name:    string;
    email:   string;
    phone:   string;
    address: Address;
    company: Company;
}

export interface Address {
    city:   string;
    street: string;
}

export interface Company {
    name: string;
}
