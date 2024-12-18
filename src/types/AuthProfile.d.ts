import { TokenResult } from "../interfaces/IAccount";

export type AuthProfile = {
    isAuthenticated: boolean = false
    userName: string;
    email: string;
    fullName: string;
    tokenResult: TokenResult
};