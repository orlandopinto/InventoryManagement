import { Users } from "../types/Users";
import { Method, _Headers, Body } from "../utilities/Constants.d";

export interface IService {
    Get: () => Promise<string>;
    GetById: (id: string) => Promise<string>;
    Post: (user: Users) => Promise<string>;
    Put: (user: Users) => Promise<string>;
    Delete: (id: string) => Promise<string>;
}

export interface IRequestOptions {
    url: string;
    method?: Method;
    headers: _Headers,
    body?: Body
}