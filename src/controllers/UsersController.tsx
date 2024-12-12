import { IUsers } from '../interfaces/IUsers';
import Service from '../services/service';
import { Users } from '../types/Users';
import { _Body } from '../utilities/Constants.d';

export class UsersController implements IUsers {

     body?: any;
     token: string;
     service: Service;

     constructor(token: string, body?: _Body) {
          this.service = new Service(token, body);
     }

     public async Get(): Promise<Array<string>> {
          let result: Array<string> = new Array<string>();
          try {
               result = await this.service.Get();
          } catch (error) {
               console.log(error)
          }
          return result;
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