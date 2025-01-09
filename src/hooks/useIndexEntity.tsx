import { useEffect, useState } from "react";
import { CustomError } from "../models/CustomError";
import { MESSAGE_TOAST_ERROR_TYPE } from "../utilities/Constants.d";
import { useShowMessageToast } from "./useShowMessageToast";

interface Controller<T> {
     Index(): Promise<string>;
     Delete(idToDelete: string): Promise<string>;
}

function useIndexEntity<T, U extends Controller<T>, V>(controller: U, viewModel: V, Mapper: (item: T) => V) {
     //CUSTOM HOOKS
     const { ShowMessageToast } = useShowMessageToast()

     //STATES
     const [isLoading, setIsLoading] = useState(false)
     const [dataViewModel, setDataViewModel] = useState<V[]>([]);
     const [showAlert, setShowAlert] = useState(false);
     const [bodyText, setBodyText] = useState('')

     useEffect(() => {
          onGetData();
     }, [])

     const onGetData = () => {
          setIsLoading(true)
          controller.Index().then((response => {
               const taxesList: T[] = response as unknown as T[]
               const result: V[] = [];
               taxesList.map((item) => result.push(Mapper(item)));
               setDataViewModel(result);
          })).catch((err) => {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          }).finally(() => {
               setIsLoading(false)
          });
     }

     const handleDelete = async (idToDelete: string) => {
          await controller.Delete(idToDelete).then((() => {
               onGetData();
               ShowMessageToast("El estado ha sido eliminado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
          })).catch((err) => {
               const error = err as CustomError
               setBodyText(error.message);
               setShowAlert(true);
          });
     }

     const handleCloseAlert = () => setShowAlert(false);

     return { dataViewModel, isLoading, showAlert, bodyText, handleCloseAlert, handleDelete }
}

export default useIndexEntity