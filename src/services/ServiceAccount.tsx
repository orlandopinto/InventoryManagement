import { _Headers, _Method, _Body, METHOD, ACCOUNT_END_POINT, API_END_POINT } from "../utilities/Constants.d";
import { CustomError } from "../models/CustomError";
import { IAccount, TokenResult } from "../interfaces/IAccount";
import { AccountViewModel, LoginViewModel, RegisterViewModel } from "../types/AccountTypes";
import axios, { AxiosHeaders } from "axios";

export default class ServiceAccount implements IAccount {

     headers: _Headers = { 'Content-type': 'application/json' };
     ENDPOINT: string

     constructor() {
          this.ENDPOINT = `${API_END_POINT.URL_BASE + ACCOUNT_END_POINT.URL}`
     }

     public async Login(loginViewModel: LoginViewModel): Promise<string> {
          return Promise.resolve(
               axios({
                    url: `${this.ENDPOINT}login`,
                    data: JSON.stringify(loginViewModel),
                    method: METHOD.POST,
                    headers: this.headers as AxiosHeaders
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error' });
                         throw error.throwCustomError()
                    })
          )
     }

     public async AccountExists(accountViewModel: AccountViewModel): Promise<string> {
          return Promise.resolve(
               axios({
                    url: `${this.ENDPOINT}AccountExists`,
                    data: JSON.stringify(accountViewModel),
                    method: METHOD.POST,
                    headers: this.headers as AxiosHeaders
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error' });
                         throw error.throwCustomError()
                    })
          )
     }

     public async Register(registerViewModel: RegisterViewModel): Promise<string> {
          return Promise.resolve(
               axios({
                    url: `${this.ENDPOINT}register`,
                    data: JSON.stringify(registerViewModel),
                    method: METHOD.POST,
                    headers: this.headers as AxiosHeaders
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error' });
                         throw error.throwCustomError()
                    })
          )
     }

     public async RefreshToken(tokenResult: TokenResult): Promise<string> {
          return Promise.resolve(
               axios({
                    url: `${this.ENDPOINT}refresh`,
                    data: JSON.stringify(tokenResult),
                    method: METHOD.POST,
                    headers: this.headers as AxiosHeaders
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error' });
                         throw error.throwCustomError()
                    })
          )
     }
}