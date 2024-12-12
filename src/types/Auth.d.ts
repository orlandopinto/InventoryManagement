export type LoginType = {
    email: string;
    password: string;
    remember_me?: boolean | undefined;
}

export interface ProviderProps {
    user:  string | null,
    token:  string,
    login (data: LoginType ): void,
    logout() :void,
}

export type AuthLoginResult = {
    isAuthenticated: boolean,
    Email?: string,
    FullName?: string,
    UserName?: string,
}
