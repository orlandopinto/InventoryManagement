import { LoginViewModel, RegisterViewModel } from "../types/AccountTypes";

export interface ILoginResult {
     isAuthenticated: boolean,
     Email?: string,
     FullName?: string,
     isAdmin?: string,
     UserName?: string,
     token?: string
}

export interface IAccount {
     Login: (entity: LoginViewModel) => Promise<ILoginResult | undefined>;
     Register: (entity: RegisterViewModel) => Promise<boolean | undefined>;
}