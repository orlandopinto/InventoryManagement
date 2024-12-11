import { IService } from "../interfaces/IService";
import { API, METHOD } from '../utilities/Constants.d'

const getRequestOptions = (method: string, entity: any) => {
    const options = {
        method: method,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(entity)
    };
    return options;
}

const service: IService = {
    getAll() {
        return Promise.resolve((
            fetch(API.URL_BASE)
                .then(res => res.json())
                .catch(err => {
                    console.log('error:' + err)
                })
        ))
    },
    getById(id: string) {
        return Promise.resolve((
            fetch(API.URL_BASE + id)
                .then(res => res.json())
                .catch(err => {
                    console.log('error:' + err)
                })
        ))
    },
    add(entity: any) {
        return Promise.resolve((
            fetch(API.URL_BASE, getRequestOptions(METHOD.POST, entity)).then(response => response.json())
                .catch(err => {
                    console.log('error:' + err)
                })
        ))
    },
    update(entity: any) {
        return Promise.resolve((
            fetch(API.URL_BASE, getRequestOptions(METHOD.PUT, entity)).then(response => response.json())
                .catch(err => {
                    console.log('error:' + err)
                })
        ))
    },
    delete(id: string) {
        return Promise.resolve((
            fetch(API.URL_BASE + id, { method: METHOD.DELETE }).then(response => response.json())
                .catch(err => {
                    console.log('error:' + err)
                })
        ))
    }
}


export default service;