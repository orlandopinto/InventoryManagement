import { Users } from "../types/Users";

export interface IUsers  {
     Get: () => Promise<Array<string>>;
     GetById: (id: string) => Promise<string>;
     Post: (user: Users) => Promise<boolean>;
     Put: (user: Users) => Promise<boolean>;
     Delete: (id: string) => Promise<boolean>;
}