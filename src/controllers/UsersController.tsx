import { IUsers } from '../interfaces/IUsers';
import { Users } from '../types/Users';
import { _Body, USERS_END_POINT } from '../utilities/Constants.d';
import { CustomError } from '../models/CustomError';
import { encrypt } from '../utilities/EncryptDecryptManager';
import AxiosService from '../services/AxiosService';

export class UsersController implements IUsers {

     body?: any;
     service: AxiosService;

     constructor(token: string) {
          this.service = new AxiosService(token, USERS_END_POINT.URL);
     }

     public async Get(): Promise<any> {
          try {
               return await this.service.Get();
          } catch (err) {
               throw err as CustomError
          }
     }

     public async GetById(id: string): Promise<string> {
          try {
               return await this.service.GetById(id);
          } catch (err) {
               throw err as CustomError
          }
     }

     public async Post(user: Users): Promise<string> {
          try {
               user.id = self.crypto.randomUUID();
               user.passwordHash = encrypt(user.passwordHash);
               user.userName = user.email;
               user.normalizedUserName = user.email;
               user.normalizedEmail = user.email;
               return await this.service.Post(user);
          } catch (err) {
               throw err as CustomError
          }
     }

     public async Put(user: Users): Promise<string> {
          try {
               return await this.service.Put(user);
          } catch (err) {
               throw err as CustomError
          }
     }

     public async Delete(id: string): Promise<string> {
          try {
               return await this.service.Delete(id);
          } catch (err) {
               throw err as CustomError
          }
     }
}