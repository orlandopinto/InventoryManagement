import { ILoginResult } from "../interfaces/IAccount"

export type Users = {
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    phoneNumber: null | string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: null;
    lockoutEnabled: boolean;
    accessFailedCount: number;
    address: null | string;
    birthDate: Date | null;
    firstName: null | string;
    lastName: null | string;
    zipCode: number | null;
    isAdmin: boolean;
    roleId: null | string;
}

export const initializedUser = {
    id: "",
    userName: "",
    normalizedUserName: "",
    email: "",
    normalizedEmail: "",
    emailConfirmed: true,
    passwordHash: "",
    phoneNumber: null,
    phoneNumberConfirmed: true,
    twoFactorEnabled: true,
    lockoutEnd: null,
    lockoutEnabled: false,
    accessFailedCount: 0,
    address: null,
    birthDate: null,
    firstName: null,
    lastName: null,
    zipCode: null,
    isAdmin: false,
    roleId: null
}

export interface UserLogged extends ILoginResult { }
