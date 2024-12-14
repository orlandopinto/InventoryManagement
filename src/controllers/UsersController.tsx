import { IUsers } from '../interfaces/IUsers';
import Service from '../services/Service';
import { Users } from '../types/Users';
import { _Body } from '../utilities/Constants.d';
import { CustomError } from '../models/CustomError';

export class UsersController implements IUsers {

     body?: any;
     service: Service;

     constructor(token: string, body?: _Body) {
          this.service = new Service(token, body);
     }

     public async Get(): Promise<any> {
          try {
               return await this.service.Get();
          } catch (err) {
               throw err as CustomError
          }
     }

     public async GetById(id: string): Promise<string> {
          let result: string = "";
          try {
               result = await this.service.GetById(id);
          } catch (error) {
               console.log(error)
          }
          return result
     }

     public async Post(user: Users): Promise<boolean> {
          let result: boolean = false
          try {
               result = await this.service.Post(user);
          } catch (error) {
               console.log(error)
          }
          return result;
     }

     public async Put(user: Users): Promise<boolean> {
          let result: boolean = false
          try {
               result = await this.service.Put(user);
          } catch (error) {
               console.log(error)
          }
          return result;
     }

     public async Delete(id: string): Promise<boolean> {
          let result: boolean = false
          try {
               result = await this.service.Delete(id);
          } catch (error) {
               console.log(error)
          }
          return result;
     }
}