import AxiosService from '../services/AxiosService';
import { _Body, STATUS_END_POINT } from '../utilities/Constants.d';
import { CustomError } from '../models/CustomError';
import { Status, StatusViewModel } from '../types/Status.types.d';
import { useAuth } from '../contexts/useAuth';

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
               throw err
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
               throw err
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
               throw err
          }
     };

     return { Index, Create, Edit, Delete }
}