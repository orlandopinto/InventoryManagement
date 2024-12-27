import AxiosService from '../services/AxiosService';
import { SubCategories, SubCategoriesViewModel } from '../types/SubCategories.d';
import { CATEGORIES_END_POINT, SUB_CATEGORIES_END_POINT } from '../utilities/Constants.d';
import { CustomError } from '../models/CustomError';
import { Categories } from '../types/Categories';

export class SubCategoriesController {
     body?: any;
     service: AxiosService;
     token: string;

     constructor(token: string) {
          this.token = token;
          this.service = new AxiosService(this.token, SUB_CATEGORIES_END_POINT.URL);
     }

     public async Get(): Promise<string> {
          try {
               let response: SubCategoriesViewModel[] = [];
               // CATEGORIES
               this.service = new AxiosService(this.token, CATEGORIES_END_POINT.URL);
               const responseCategories = await this.service.Get() as unknown as Categories[];
               // SUB CATEGORIES
               this.service = new AxiosService(this.token, SUB_CATEGORIES_END_POINT.URL);
               const responseSubCategories = await this.service.Get() as unknown as SubCategories[];
               // CATEGORIES VIEW MODEL
               responseSubCategories.map((subCategory: SubCategories) => {
                    const category = responseCategories.find((category) => category.id === subCategory.categoryID);
                    const subCategoryViewModel: SubCategoriesViewModel = {
                         id: subCategory.id,
                         categoryID: subCategory.categoryID,
                         categoryCode: category?.categoryCode as string,
                         categoryName: category?.categoryName as string,
                         categoryImage: category?.categoryImagePath as string,
                         subCategoryName: subCategory.subCategoryName,
                         subCategoryDescription: subCategory.subCategoryDescription,
                         createBy: subCategory.createBy,
                         creationDate: subCategory.creationDate,
                         updateDate: subCategory.updateDate
                    }
                    response.push(subCategoryViewModel);
               });
               //RESPONSE
               return response as unknown as Promise<string>;
          } catch (err) {
               throw err as CustomError
          }
     }

     public async GetById(id: string): Promise<string> {
          try {
               // CATEGORIES
               this.service = new AxiosService(this.token, CATEGORIES_END_POINT.URL);
               const responseCategories = await this.service.Get() as unknown as Categories[];
               // SUB CATEGORY
               this.service = new AxiosService(this.token, SUB_CATEGORIES_END_POINT.URL);
               const responseSubCategory = await this.service.GetById(id) as unknown as SubCategories;
               // CATEGORY VIEW MODEL
               const category = responseCategories.find((category) => category.id === responseSubCategory.categoryID);
               const response: SubCategoriesViewModel = {
                    id: responseSubCategory.id,
                    categoryID: responseSubCategory.categoryID,
                    categoryCode: category?.categoryCode as string,
                    categoryName: category?.categoryName as string,
                    categoryImage: category?.categoryImagePath as string,
                    subCategoryName: responseSubCategory.subCategoryName,
                    subCategoryDescription: responseSubCategory.subCategoryDescription,
                    createBy: responseSubCategory.createBy,
                    creationDate: responseSubCategory.creationDate,
                    updateDate: responseSubCategory.updateDate
               }
               //RESPONSE
               return response as unknown as Promise<string>;
          } catch (err) {
               throw err as CustomError
          }
     }

     public async Post(subCategory: SubCategories): Promise<string> {
          try {
               subCategory.id = self.crypto.randomUUID();
               return await this.service.Post(subCategory);
          } catch (err) {
               throw err as CustomError
          }
     }

     public async Put(subCategory: SubCategories): Promise<string> {
          try {
               subCategory.updateDate = new Date
               return await this.service.Put(subCategory);
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