import { _Headers, _Method, _Body, METHOD, API_END_POINT } from "../utilities/Constants.d";
import { CustomError } from "../models/CustomError";
import { IService } from "../interfaces/IService";
import axios, { AxiosHeaders } from "axios";
//import axiosInstance from '../services/axiosInstance';

export default class AxiosService implements IService {

     headers: _Headers = new Headers();
     endPoint: string;

     constructor(token: string, endPoint: string) {
          this.endPoint = `${API_END_POINT.URL_BASE + endPoint}`;
          this.headers = {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
          };
     }

     //TODO: CUANDO SE OPTIMIZE EL BACKEND CAMBIAR DE axios A axiosInstance
     public async Get(): Promise<string> {
          return Promise.resolve(
               axios({
                    url: this.endPoint,
                    method: METHOD.GET,
                    headers: this.headers as AxiosHeaders
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error' });
                         throw error.throwCustomError()
                    })
          )
     }

     public async GetById(id: string): Promise<string> {
          return Promise.resolve(
               axios({
                    url: this.endPoint + id,
                    method: METHOD.GET,
                    headers: this.headers as AxiosHeaders
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error', stack: 'handled error' });
                         throw error.throwCustomError()
                    })
          )
     }

     public async GetByDescription(description: string): Promise<string> {
          return Promise.resolve(
               axios({ url: this.endPoint, method: METHOD.GET, headers: this.headers as AxiosHeaders })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error', stack: 'handled error' });
                         throw error.throwCustomError()
                    })
          )
     }

     public async Post<T>(entity: T): Promise<string> {
          return Promise.resolve(
               axios({
                    url: this.endPoint,
                    data: JSON.stringify(entity),
                    method: METHOD.POST,
                    headers: this.headers as AxiosHeaders
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error', stack: 'handled error' });
                         throw error.throwCustomError()
                    })
          )
     }

     public async Put<T>(entity: T): Promise<string> {
          return Promise.resolve(
               axios({
                    url: this.endPoint,
                    data: JSON.stringify(entity),
                    method: METHOD.PUT,
                    headers: this.headers as AxiosHeaders
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error', stack: 'handled error' });
                         throw error.throwCustomError()
                    })
          )
     }

     public async Delete(id: string): Promise<string> {
          return Promise.resolve(
               axios({
                    url: this.endPoint + id,
                    method: METHOD.DELETE,
                    headers: this.headers as AxiosHeaders
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error', stack: 'handled error' });
                         throw error.throwCustomError()
                    })
          )
     }

     public async UploadMedia(image: FormData, ImageEndPoint: string = 'http://localhost:4000/upload-product-images'): Promise<string> {
          return Promise.resolve(
               axios({
                    url: ImageEndPoint,
                    method: METHOD.POST,
                    data: image,
                    headers: {
                         "X-Requested-With": "XMLHttpRequest",
                         'Access-Control-Allow-Origin': '*',
                         'Content-Type': 'multipart/form-data'
                    }
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error to upload media file', stack: 'handled error' });
                         throw error.throwCustomError()
                    })
          )
     }
}