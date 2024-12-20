import { _Headers, _Method, _Body, METHOD } from "../utilities/Constants.d";
import { CustomError } from "../models/CustomError";
import { IService } from "../interfaces/IService";

export default class FetchService implements IService {

    headers: _Headers = new Headers();
    endPoint: string;

    constructor(token: string, endPoint: string) {
        this.endPoint = endPoint;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
    }

    public async Get(): Promise<string> {
        return Promise.resolve((
            fetch(this.endPoint, { method: METHOD.GET, headers: this.headers })
                .then(res => res.json())
                .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
                })
        ))
    }

    public async GetById(id: string): Promise<string> {
        return Promise.resolve((
            fetch(this.endPoint + id, { method: METHOD.GET, headers: this.headers })
                .then(res => res.json())
                .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
                })
        ))
    }

    public async Post<T>(entity: T): Promise<string> {
        return Promise.resolve((
            fetch(this.endPoint, { method: METHOD.POST, headers: this.headers, body: JSON.stringify(entity) })
                .then(res => res.json())
                .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
                })
        ))
    }

    public async Put<T>(entity: T): Promise<string> {
        return Promise.resolve((
            fetch(this.endPoint, { method: METHOD.PUT, headers: this.headers, body: JSON.stringify(entity) })
                .then(res => res.json())
                .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
                })
        ))
    }

    public async Delete(id: string): Promise<string> {
        return Promise.resolve((
            fetch(this.endPoint + id, { method: METHOD.DELETE, headers: this.headers })
                .then(res => res.json())
                .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
                })
        ))
    }
}