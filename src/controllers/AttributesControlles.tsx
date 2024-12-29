import AxiosService from '../services/AxiosService';
import { Categories } from '../types/Categories.d';
import { _Body, CATEGORIES_END_POINT } from '../utilities/Constants.d';
import { CustomError } from '../models/CustomError';

export class AttributesControlles {
     body?: any;
     service: AxiosService;

     constructor(token: string) {
          this.service = new AxiosService(token, CATEGORIES_END_POINT.URL);
     }

     public async Get(): Promise<string> {
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