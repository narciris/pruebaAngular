import { Title } from "@angular/platform-browser";

export interface User {
    id: number,
    name: string,
    username:string,
    email: string
    address: Address
}

export interface Address {
    street: string,
    city: string
}
