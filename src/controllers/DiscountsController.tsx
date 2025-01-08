import AxiosService from '../services/AxiosService';
import { _Body, DISCOUNTS_END_POINT } from '../utilities/Constants.d';
import { CustomError } from '../models/CustomError';
import { Discount } from '../types/Discount.type';

export class DiscountsController {

     body?: any;
     service: AxiosService;

     constructor(token: string) {
          this.service = new AxiosService(token, DISCOUNTS_END_POINT.URL);
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

     public async Post(discount: Discount): Promise<string> {
          try {
               discount.id = self.crypto.randomUUID();
               discount.creationDate = new Date;
               const descriptionExist: Discount[] = await this.service.GetByDescription(discount.discountDescription) as unknown as Discount[];
               if (descriptionExist.some(data => data.discountDescription === discount.discountDescription)) {
                    const error = new CustomError({ message: 'Descripción del descuento duplicada', name: 'Error' });
                    throw error
               }
               return await this.service.Post(discount);
          } catch (err) {
               throw err as CustomError
          }
     }

     public async Put(discount: Discount): Promise<string> {
          try {
               discount.updateDate = new Date;
               return await this.service.Put(discount);
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