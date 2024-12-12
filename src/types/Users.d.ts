import { ILoginResult } from "../interfaces/IAccount"

export type Users = {
    id: string
    userName: string | null
    normalizedUserName: string | null
    email: string
    normalizedEmail: string
    emailConfirmed: boolean
    passwordHash: string
    phoneNumber: string | null
    phoneNumberConfirmed: boolean
    twoFactorEnabled: boolean
    lockoutEnd: Date | null
    lockoutEnabled: boolean
    accessFailedCount: Number
    address: string | null
    birthDate: Date | null
    firstName: string | null
    lastName: string | null
    zipCode: number | null
    isAdmin: boolean
    roleId: string | null
}

export interface UserLogged extends ILoginResult { }
