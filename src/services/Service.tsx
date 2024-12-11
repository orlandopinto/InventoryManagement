import { IBaseTransactions } from "../interfaces/IBaseTransactions";
import { _Headers, API, _Method, _Body, METHOD } from "../utilities/Constants.d";
import { ErrorInfo } from "../types/types";

export default class Service implements IBaseTransactions {

    headers: _Headers = { 'Content-type': 'application/json' };
    stringData: string = "";
    booleanData: boolean = false;
    arrayData: Array<string> = new Array<string>();
    response = new Response();
    body?: any;

    constructor(body?: _Body) {
        this.body = body;
    }

    public async Get(): Promise<Array<string>> {
        try {
            this.response = await fetch(API.URL_BASE, { method: METHOD.GET, headers: this.headers, body: this.body });
            if (!this.response.ok) {
                const error = new CustomError({ message: 'Unable to fetch data', name: 'Custom Error', status: this.response.status, statusText: this.response.statusText });
                throw error.throwCustomError()
            }
            this.arrayData = await this.response.json();
        } catch (error: any) {
            console.log('error:' + error)
        }
        return this.arrayData
    }

    public async GetById(id: string): Promise<string> {
        try {
            this.response = await fetch(API.URL_BASE + id, { method: METHOD.GET, headers: this.headers, body: this.body });
            if (!this.response.ok) {
                const error = new CustomError({ message: 'Unable to fetch data', name: 'Custom Error', status: this.response.status, statusText: this.response.statusText });
                throw error.throwCustomError()
            }
            this.stringData = await this.response.json();
        } catch (error: any) {
            console.log('error:' + error)
        }
        return this.stringData;
    }

    public async Post(entity: any): Promise<boolean> {
        try {
            this.body = JSON.stringify(entity);
            this.response = await fetch(API.URL_BASE, { method: METHOD.POST, headers: this.headers, body: this.body });
            if (!this.response.ok) {
                const error = new CustomError({ message: 'Unable to fetch data', name: 'Custom Error', status: this.response.status, statusText: this.response.statusText });
                throw error.throwCustomError()
            }
            this.booleanData = await this.response.json();
        } catch (error: any) {
            console.log('error:' + error)
        }
        return this.booleanData;
    }

    public async Put(entity: any): Promise<boolean> {
        try {
            this.body = JSON.stringify(entity);
            this.response = await fetch(API.URL_BASE, { method: METHOD.PUT, headers: this.headers, body: this.body });
            if (!this.response.ok) {
                const error = new CustomError({ message: 'Unable to fetch data', name: 'Custom Error', status: this.response.status, statusText: this.response.statusText });
                throw error.throwCustomError()
            }
            this.booleanData = await this.response.json();
        } catch (error: any) {
            console.log('error:' + error)
        }
        return this.booleanData;
    }

    public async Delete(id: string): Promise<boolean> {
        try {
            this.response = await fetch(API.URL_BASE + id, { method: METHOD.DELETE, headers: this.headers, body: this.body });
            if (!this.response.ok) {
                const error = new CustomError({ message: 'Unable to fetch data', name: 'Custom Error', status: this.response.status, statusText: this.response.statusText });
                throw error.throwCustomError()
            }
            this.booleanData = await this.response.json();
        } catch (error: any) {
            console.log('error:' + error)
        }
        return this.booleanData;
    }
}

class CustomError {
    name: string;
    message: string;
    stack?: string;
    status?: number;
    statusText?: string;
    constructor(err: ErrorInfo) {
        this.name = err.name;
        this.message = err.message;
        this.stack = err.stack;
        this.status = err.status;
        this.statusText = err.statusText;
    }

    throwCustomError(): ErrorInfo {
        const err: ErrorInfo = { name: this.name, message: this.message, stack: this.stack, status: this.status, statusText: this.statusText }
        return err;
    }
}

// export default class Service implements IRequestOptions {
//     url: string;
//     method?: any;
//     headers: _Headers;
//     body?: any;

//     constructor(url: string, method: _Method, headers: _Headers, body?: _Body) {
//         this.url = url;
//         this.method = method || "GET";
//         this.headers = headers || {};
//         this.body = body;
//     }
//     request(): Observable<any> {
//         return new Observable(observer => {
//             fetch(`${API.URL_BASE}${this.url}`, {
//                 method: this.method as any,
//                 headers: this.headers,
//                 body: this.body
//             }).then((r: any) => {
//                 return r.json()
//             }).then((data: any) => {
//                 observer.next(data);
//                 observer.complete();
//             }).catch((e: any) => {
//                 observer.error(e);
//             })
//         });
//     }
// }