
export const API_END_POINT = { URL_BASE: 'https://localhost:4433' }
export const ACCOUNT_END_POINT = { URL: '/account/api/' }
export const USERS_END_POINT = { URL: '/users/api/' }
export const CATEGORIES_END_POINT = { URL: '/categories/api/' }
export const SUB_CATEGORIES_END_POINT = { URL: '/subcategories/api/' }

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