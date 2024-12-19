
export const API_ACCOUNT = { URL_BASE: 'https://localhost:4433/account/api/' }
export const API_USERS = { URL_BASE: 'https://localhost:4433/users/api/' }
export const API_CATEGORIES = { URL_BASE: 'https://localhost:4433/categories/api/' }

export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

export const MESSAGE_TOAST_ERROR_TYPE = {
    ERROR: 'ERROR',
    INFO: 'INFO',
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING'
}

export enum AllowedMethods {
    "GET", "POST", "PUT", "DELETE"
}

export type _Body = string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined;
export type _Method = keyof typeof AllowedMethods;
export type _Headers = [string, string][] | Record<string, string> | Headers

export const secretKey = 'd77b7c8c9aa0cdcccb108befd90fff4b6d200d5d5a9d82c2fb62c884f20356ab'