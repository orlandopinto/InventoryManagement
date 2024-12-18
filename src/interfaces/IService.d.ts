import { Users } from "../types/Users";
import { Method, _Headers, Body } from "../utilities/Constants.d";

export interface IService {
    Get: () => Promise<string>;
    GetById: (id: string) => Promise<string>;
    Post: (entity: T) => Promise<string>;
    Put: (entity: T) => Promise<string>;
    Delete: (id: string) => Promise<string>;
}