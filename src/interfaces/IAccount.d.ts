import { LoginViewModel, RegisterViewModel } from "../types/AccountTypes";

export interface ILoginResult {
     isAuthenticated: boolean,
     Email?: string,
     FullName?: string,
     isAdmin?: boolean,
     UserName?: string,
     tokenResult?: TokenResult
}

export type LoginResult = {
     isAuthenticated: boolean,
     Email?: string,
     FullName?: string,
     isAdmin?: boolean,
     UserName?: string,
     tokenResult?: TokenResult
}

export type TokenResult = {
     accessToken?: string,
     refreshToken?: string,
}

export interface IAccount {
     Login: (entity: LoginViewModel) => Promise<ILoginResult | undefined>;
     Register: (entity: RegisterViewModel) => Promise<boolean | undefined>;
     RefreshToken: (entity: TokenResult) => Promise<TokenResult | undefined>;
}