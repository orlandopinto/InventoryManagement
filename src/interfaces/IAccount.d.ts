import { LoginViewModel, RegisterViewModel } from "../types/AccountTypes";

export interface ILoginResult {
     isAuthenticated: boolean,
     Email?: string,
     FullName?: string,
     isAdmin?: boolean,
     UserName?: string,
     token?: string
}

export type LoginResult = {
     isAuthenticated: boolean,
     Email?: string,
     FullName?: string,
     isAdmin?: boolean,
     UserName?: string,
}


export interface IAccount {
     Login: (entity: LoginViewModel) => Promise<ILoginResult | undefined>;
     Register: (entity: RegisterViewModel) => Promise<boolean | undefined>;
}