import AxiosService from '../services/AxiosService';
import { _Body, ATTRIBUTE_VALUES_END_POINT, ATTRIBUTES_END_POINT } from '../utilities/Constants.d';
import { CustomError } from '../models/CustomError';
import { Attributes, AttributesViewModel, AttributeValues } from '../types/Attributes';

export class AttributesController {
     body?: any;
     service: AxiosService;
     _token: string;

     constructor(token: string) {
          this._token = token;
          this.service = new AxiosService(this._token, ATTRIBUTES_END_POINT.URL);
     }

     public async Get(): Promise<AttributesViewModel> {
          try {
               const attributesViewModel: AttributesViewModel = {
                    attributes: [],
                    attributeValues: []
               }

               await this.service.Get().then(response => {
                    attributesViewModel.attributes = response as unknown as Attributes[];
               })

               this.service = new AxiosService(this._token, ATTRIBUTE_VALUES_END_POINT.URL);
               await this.service.Get().then(response => {
                    attributesViewModel.attributeValues = response as unknown as AttributeValues[];
               })

               return attributesViewModel
          } catch (err) {
               throw err as CustomError
          }
     }

     public async Post(attribute: Attributes): Promise<string> {
          try {
               return await this.service.Post(attribute);
          } catch (err) {
               throw err as CustomError
          }
     }

     public async PostAttributeValues(attributeValue: AttributeValues): Promise<string> {
          try {
               this.service = new AxiosService(this._token, ATTRIBUTE_VALUES_END_POINT.URL);
               return await this.service.Post(attributeValue);
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

     public async DeleteAttributeValue(id: string): Promise<string> {
          try {
               this.service = new AxiosService(this._token, ATTRIBUTE_VALUES_END_POINT.URL);
               return await this.service.Delete(id);
          } catch (err) {
               throw err as CustomError
          }
     }
}