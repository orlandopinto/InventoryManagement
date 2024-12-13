import { TokenResult } from "../interfaces/IAccount";

export interface ErrorInfo extends Error {
    status?: number;
    statusText?: string;
}

export type ApiOptions = {
    method: string,
    headers: {},
    body: string
}

export type ApiRequestOptions<T> = {
    method: string,
    id?: string,
    entity?: T
}

export type AuthProfile = {
    isAuthenticated: boolean = false
    userName: string;
    email: string;
    fullName: string;
    tokenResult: TokenResult
};

export interface User {
    isAuthenticated: boolean,
    email?: string,
    fullName?: string,
    isAdmin?: boolean,
    userName?: string,
    tokenResult?: string
}