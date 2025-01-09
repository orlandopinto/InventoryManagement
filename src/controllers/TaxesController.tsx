import { useAuth } from '../contexts/useAuth';
import { CustomError } from '../models/CustomError';
import AxiosService from '../services/AxiosService';
import { Taxes } from '../types/Taxes.types.d';
import { TAXES_END_POINT } from '../utilities/Constants.d';
import { CompareMajorEqualDate } from '../views/tools/CommonFunctions';

export const TaxesController = () => {
     const { tokenResult, user } = useAuth()
     const service = new AxiosService(tokenResult?.accessToken as string, TAXES_END_POINT.URL);

     const Index = async () => {
          try {
               return await service.Get();
          } catch (err) {
               //throw err as CustomError ==> registrar este error en un archivo .log
               const error = new CustomError({ message: 'Se ha producido un error al consultar los impuestos.', name: 'Error' });
               throw error
          }
     };

     const Create = async (Tax: Taxes) => {
          try {
               if (Tax.dateTo && CompareMajorEqualDate(Tax.dateFrom, Tax.dateTo)) {
                    const error = new CustomError({ message: 'La fecha de inicio no puede ser mayor o igual a la fecha fin.', name: 'Error' });
                    throw error
               }
               Tax.createBy = user?.fullName.trim() as string
               Tax.id = self.crypto.randomUUID();
               Tax.creationDate = new Date;
               Tax.tax = Tax.tax.toString().replace(',', '.');
               const foundTax: Taxes[] = await service.GetByDescription(Tax.taxDescription) as unknown as Taxes[];
               if (foundTax.some(data => data.taxDescription === Tax.taxDescription)) {
                    const error = new CustomError({ message: 'Descripción del impuesto duplicado.', name: 'Error' });
                    throw error
               }
               return await service.Post(Tax);
          } catch (err) {
               const error: CustomError = err as unknown as CustomError
               if (error.stack === 'handled error') {
                    error.name = 'Error';
                    error.message = 'Se ha producido un error al crear el impuesto, intente de nuevo.';
               }
               throw error
          }
     };

     const Edit = async (Tax: Taxes) => {
          try {
               if (Tax.dateTo && CompareMajorEqualDate(Tax.dateFrom, Tax.dateTo)) {
                    const error = new CustomError({ message: 'La fecha de inicio no puede ser mayor o igual a la fecha fin.', name: 'Error' });
                    throw error
               }
               Tax.tax = Tax.tax.toString().replace(',', '.');
               const foundTax: Taxes[] = await service.GetByDescription(Tax.taxDescription) as unknown as Taxes[];
               if (foundTax.some(data => data.taxDescription === Tax.taxDescription && Tax.id !== data.id)) {
                    const error = new CustomError({ message: 'Descripción del impuesto duplicado.', name: 'Error' });
                    throw error
               }
               Tax.updateDate = new Date;
               return await service.Put(Tax);
          } catch (err) {
               const error: CustomError = err as unknown as CustomError
               if (error.stack === 'handled error') {
                    error.name = 'Error';
                    error.message = 'Se ha producido un error al actualizar el impuesto, intente de nuevo.';
               }
               throw error
          }
     };

     const Delete = async (id: string) => {
          try {
               const response = await service.Delete(id);
               if (response as unknown as boolean !== true) {
                    throw new CustomError({ message: 'Se produjo un error al eliminar el impuesto, por favor intente de nuevo!', name: 'Error' });
               }
               return response;
          } catch (err) {
               const error: CustomError = err as unknown as CustomError
               if (error.stack === 'handled error') {
                    error.name = 'Error';
                    error.message = 'Se ha producido un error al eliminar el impuesto, intente de nuevo.';
               }
               throw error
          }
     };

     return { Index, Create, Edit, Delete }
}