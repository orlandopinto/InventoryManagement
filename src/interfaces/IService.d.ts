import { Method, _Headers, Body } from "../utilities/Constants.d";

export interface IService {
    getAll: () => Promise<Array<string>>;
    getById: (id: string) => Promise<string>;
    update: (entity: any) => Promise<boolean>;
    add: (entity: any) => Promise<boolean>;
    delete: (id: string) => Promise<boolean>;
}

export interface IRequestOptions {
    url: string;
    method?: Method;
    headers: _Headers,
    body?: Body
}