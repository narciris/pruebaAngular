import { Title } from "@angular/platform-browser";

export interface User {
    id: number,
    name: string,
    username:string,
    email: string
}

export interface Address {
    street: string,
    city: string
}
