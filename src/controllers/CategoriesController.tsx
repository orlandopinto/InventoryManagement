import { ICategories } from '../interfaces/ICategories';
import Service from '../services/Service';
import { Categories } from '../types/Categories.d';
import { _Body, API_CATEGORIES } from '../utilities/Constants.d';
import { CustomError } from '../models/CustomError';

export class CategoriesController implements ICategories {

     body?: any;
     service: Service;

     constructor(token: string) {
          this.service = new Service(token, API_CATEGORIES.URL_BASE);
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

     public async Post(Category: Categories): Promise<string> {
          try {
               return await this.service.Post(Category);
          } catch (err) {
               throw err as CustomError
          }
     }

     public async Put(Category: Categories): Promise<string> {
          try {
               return await this.service.Put(Category);
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