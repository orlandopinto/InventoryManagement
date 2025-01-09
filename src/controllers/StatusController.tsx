import { useAuth } from '../contexts/useAuth';
import { CustomError } from '../models/CustomError';
import AxiosService from '../services/AxiosService';
import { Status, StatusViewModel } from '../types/Status.types.d';
import { STATUS_END_POINT } from '../utilities/Constants.d';

export const StatusController = () => {
     const { tokenResult, user } = useAuth()
     const service = new AxiosService(tokenResult?.accessToken as string, STATUS_END_POINT.URL);

     const Index = async () => {
          try {
               return await service.Get();
          } catch (err) {
               //throw err as CustomError ==> registrar este error en un archivo .log
               const error = new CustomError({ message: 'Se produjo al consultar los estados', name: 'Error' });
               throw error
          }
     };

     const Create = async (status: Status) => {
          try {
               status.createBy = user?.fullName.trim() as string
               status.id = self.crypto.randomUUID();
               status.creationDate = new Date;
               const foundStatus: Status[] = await service.GetByDescription(status.statusDescription) as unknown as Status[];
               if (foundStatus.some(data => data.statusDescription === status.statusDescription)) {
                    const error = new CustomError({ message: 'Descripción del estatus duplicado', name: 'Error' });
                    throw error
               }
               return await service.Post(status);
          } catch (err) {
               const error: CustomError = err as unknown as CustomError
               if (error.stack === 'handled error') {
                    error.name = 'Error';
                    error.message = 'Se ha producido un error al crear el estado, intente de nuevo.';
               }
               throw error
          }
     };

     const Edit = async (status: StatusViewModel) => {
          try {
               const foundStatus: Status[] = await service.GetByDescription(status.statusDescription) as unknown as Status[];
               if (foundStatus.some(data => data.statusDescription === status.statusDescription && status.id !== data.id)) {
                    const error = new CustomError({ message: 'Descripción del estatus duplicado', name: 'Error' });
                    throw error
               }
               status.updateDate = new Date;
               return await service.Put(status);
          } catch (err) {
               const error: CustomError = err as unknown as CustomError
               if (error.stack === 'handled error') {
                    error.name = 'Error';
                    error.message = 'Se ha producido un error al actualiza el estado, intente de nuevo.';
               }
               throw error
          }
     };

     const Delete = async (id: string) => {
          try {
               const response = await service.Delete(id);
               if (response as unknown as boolean !== true) {
                    throw new CustomError({ message: 'Se produjo un error al eliminar el estado, por favor intente de nuevo!', name: 'Error' });
               }
               return response;
          } catch (err) {
               const error: CustomError = err as unknown as CustomError
               if (error.stack === 'handled error') {
                    error.name = 'Error';
                    error.message = 'Se produjo un error al eliminar el estado, por favor intente de nuevo!';
               }
               throw error
          }
     };

     return { Index, Create, Edit, Delete }
}