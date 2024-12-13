import { _Headers, _Method, _Body, METHOD, API_ACOOUNT } from "../utilities/Constants.d";
import { ErrorInfo } from "../types/types";
import { IAccount, LoginResult, TokenResult } from "../interfaces/IAccount";
import { LoginViewModel, RegisterViewModel } from "../types/AccountTypes";

export default class ServiceAccount implements IAccount {

     headers: _Headers = { 'Content-type': 'application/json' };
     loginResult: LoginResult;
     tokenResult: TokenResult;
     registerResult: boolean;
     response = new Response();
     body?: any;

     constructor(body?: _Body) {
          this.body = body;
          this.loginResult = {} as LoginResult
          this.registerResult = false;
          this.tokenResult = {} as TokenResult
     }

     public async Login(entity: LoginViewModel): Promise<LoginResult> {
          try {
               this.body = JSON.stringify(entity);
               this.response = await fetch(`${API_ACOOUNT.URL_BASE}Login`, { method: METHOD.POST, headers: this.headers, body: this.body });

               if (!this.response.ok) {
                    const error = new CustomError({ message: 'Unable to fetch data', name: 'Custom Error', status: this.response.status, statusText: this.response.statusText });
                    throw error.throwCustomError()
               }
               this.loginResult = await this.response.json();
          } catch (error: any) {
               console.log('error:' + error)
          }
          return this.loginResult;
     }

     public async Register(entity: RegisterViewModel): Promise<boolean> {
          try {
               this.body = JSON.stringify(entity);
               this.response = await fetch(`${API_ACOOUNT.URL_BASE}Register`, { method: METHOD.PUT, headers: this.headers, body: this.body });
               if (!this.response.ok) {
                    const error = new CustomError({ message: 'Unable to fetch data', name: 'Custom Error', status: this.response.status, statusText: this.response.statusText });
                    throw error.throwCustomError()
               }
               this.registerResult = await this.response.json();
          } catch (error: any) {
               console.log('error:' + error)
          }
          return this.registerResult;
     }

     public async RefreshToken(entity: TokenResult): Promise<TokenResult> {
          try {
               this.body = JSON.stringify(entity);
               this.response = await fetch(`${API_ACOOUNT.URL_BASE}refresh`, { method: METHOD.POST, headers: this.headers, body: this.body });

               if (!this.response.ok) {
                    const error = new CustomError({ message: 'Unable to fetch data', name: 'Custom Error', status: this.response.status, statusText: this.response.statusText });
                    throw error.throwCustomError()
               }
               this.tokenResult = await this.response.json();
          } catch (error: any) {
               console.log('error:' + error)
          }
          return this.tokenResult;
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