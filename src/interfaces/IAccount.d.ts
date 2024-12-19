import { AccountViewModel, LoginViewModel, RegisterViewModel } from "../types/AccountTypes";

export interface ILoginResult {
     isAuthenticated: boolean,
     email?: string,
     fullName?: string,
     isAdmin?: boolean,
     userName?: string,
     tokenResult?: TokenResult
}

export type LoginResult = {
     isAuthenticated: boolean,
     email?: string,
     fullName?: string,
     isAdmin?: boolean,
     userName?: string,
     tokenResult?: TokenResult
}

export type RegisterResult = {
     isSuccess: boolean,
     result: boolean
}

export type AccountExistsResult = {
     isSuccess: boolean,
     result: boolean
}

export type TokenResult = {
     accessToken?: string,
     refreshToken?: string,
}

export interface IAccount {
     Login: (loginViewModel: LoginViewModel) => Promise<string>;
     AccountExists: (accountViewModel: AccountViewModel) => Promise<string>;
     Register: (registerViewModel: RegisterViewModel) => Promise<string>;
     RefreshToken: (tokenResult: TokenResult) => Promise<string>;
}