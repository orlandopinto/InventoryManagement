import { _Headers, API, _Method, _Body, METHOD } from "../utilities/Constants.d";
import { CustomError } from "../models/CustomError";
import { IService } from "../interfaces/IService";
import { Users } from "../types/Users";

export default class Service implements IService {

    headers: _Headers = new Headers();

    constructor(token: string) {
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
    }

    public async Get(): Promise<string> {
        return Promise.resolve((
            fetch(API.URL_BASE, { method: METHOD.GET, headers: this.headers })
                .then(res => res.json())
                .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
                })
        ))
    }

    public async GetById(id: string): Promise<string> {
        return Promise.resolve((
            fetch(API.URL_BASE + id, { method: METHOD.GET, headers: this.headers })
                .then(res => res.json())
                .then(response => {
                    const respuest = response
                    return response
                })
                .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
                })
        ))
    }

    public async Post(user: Users): Promise<string> {
        return Promise.resolve((
            fetch(API.URL_BASE, { method: METHOD.POST, headers: this.headers, body: JSON.stringify(user) })
                .then(res => res.json())
                .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
                })
        ))
    }

    public async Put(user: Users): Promise<string> {
        return Promise.resolve((
            fetch(API.URL_BASE, { method: METHOD.PUT, headers: this.headers, body: JSON.stringify(user) })
                .then(res => res.json())
                .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
                })
        ))
    }

    public async Delete(id: string): Promise<string> {
        return Promise.resolve((
            fetch(API.URL_BASE + id, { method: METHOD.DELETE, headers: this.headers })
                .then(res => res.json())
                .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
                })
        ))
    }
}