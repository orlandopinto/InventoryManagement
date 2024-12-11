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
