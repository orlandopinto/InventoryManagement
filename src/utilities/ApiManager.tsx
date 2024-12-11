import { ApiRequestOptions } from '../types/types';
import { API, METHOD } from './Constants.d';
import { CustomError } from './CustomError'

const getRequestOptions = (method: string, entity?: any) => {
    return {
        method: method,
        headers: { 'Content-type': 'application/json' },
        body: entity && JSON.stringify(entity)
    };
}

async function ApiManager<T>(options: ApiRequestOptions<T>): Promise<T[]> {
    let data = [];
    let response = new Response();
    try {
        switch (options.method) {
            case METHOD.GET:
                const url = options.id == null ? API.URL_BASE : API.URL_BASE + options.id
                response = await fetch(url, getRequestOptions(options.method, options.entity));
                break;

            case METHOD.POST:
            case METHOD.PUT:
                response = await fetch(API.URL_BASE, getRequestOptions(options.method, options.entity));
                break;

            case METHOD.DELETE:
                response = await fetch(API.URL_BASE + options.id, getRequestOptions(options.method, options.entity));
                break;

            default:
                response = await fetch(API.URL_BASE, getRequestOptions(options.method, options.entity));
                break;
        }

        // Error handling
        if (!response.ok) {
            const error = CustomError({ message: 'Unable to fetch data', name: 'Custom Error', status: response.status, statusText: response.statusText });
            throw error;
        }
        data = await response.json();
        if (!(data instanceof Array)) {
            data = [data]
        }
    } catch (error) {
        console.error(error);
    }
    return data;
}

export default ApiManager