import { _Headers, API, _Method, _Body, METHOD } from "../utilities/Constants.d";
import { IUsers } from "../interfaces/IUsers";
import { CustomError } from "../models/CustomError";

export default class Service implements IUsers {

    headers: _Headers = new Headers();
    stringData: string = "";
    booleanData: boolean = false;
    response = new Response();
    body?: any;
    token: string;

    constructor(token: string, body?: _Body) {
        this.body = body;
        this.token = token;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
    }

    public async Get(): Promise<any> {
        return Promise.resolve((
            (this.body === "" ?
                fetch(API.URL_BASE, { method: METHOD.GET, headers: this.headers })
                :
                fetch(API.URL_BASE, { method: METHOD.GET, headers: this.headers, body: this.body })
            ).then(res => res.json())
                .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
                })
        ))
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