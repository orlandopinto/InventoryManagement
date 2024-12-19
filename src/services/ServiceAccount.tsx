import { _Headers, _Method, _Body, METHOD, API_ACCOUNT } from "../utilities/Constants.d";
import { CustomError } from "../models/CustomError";
import { IAccount, TokenResult } from "../interfaces/IAccount";
import { AccountViewModel, LoginViewModel, RegisterViewModel } from "../types/AccountTypes";

export default class ServiceAccount implements IAccount {

     headers: _Headers = { 'Content-type': 'application/json' };

     constructor() {

     }

     public async Login(loginViewModel: LoginViewModel): Promise<string> {
          return Promise.resolve((fetch(`${API_ACCOUNT.URL_BASE}login`, { method: METHOD.POST, headers: this.headers, body: JSON.stringify(loginViewModel) })
               .then(res => res.json())
               .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
               })
          ))
     }

     public async AccountExists(accountViewModel: AccountViewModel): Promise<string> {
          return Promise.resolve((fetch(`${API_ACCOUNT.URL_BASE}AccountExists`, { method: METHOD.POST, headers: this.headers, body: JSON.stringify(accountViewModel) })
               .then(res => res.json())
               .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
               })
          ))
     }

     public async Register(registerViewModel: RegisterViewModel): Promise<string> {
          return Promise.resolve((fetch(`${API_ACCOUNT.URL_BASE}register`, { method: METHOD.POST, headers: this.headers, body: JSON.stringify(registerViewModel) })
               .then(res => res.json())
               .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
               })
          ))
     }

     public async RefreshToken(tokenResult: TokenResult): Promise<string> {
          return Promise.resolve((fetch(`${API_ACCOUNT.URL_BASE}refresh`, { method: METHOD.POST, headers: this.headers, body: JSON.stringify(tokenResult) })
               .then(res => res.json())
               .catch(err => {
                    const error = new CustomError({ message: err.toString(), name: 'API Error' });
                    throw error.throwCustomError()
               })
          ))
     }
}