import { Users } from "../types/Users";

export interface IUsers {
     Get: () => Promise<any>;
     GetById: (id: string) => Promise<string>;
     Post: (user: Users) => Promise<string>;
     Put: (user: Users) => Promise<string>;
     Delete: (id: string) => Promise<string>;
}