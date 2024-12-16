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
     Login: (loginViewModel: LoginViewModel) => Promise<string>;
     Register: (registerViewModel: RegisterViewModel) => Promise<string>;
     RefreshToken: (tokenResult: TokenResult) => Promise<string>;
}