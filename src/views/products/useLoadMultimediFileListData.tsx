import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/useAuth"
import { useShowMessageToast } from "../../hooks/useShowMessageToast"
import { CustomError } from "../../models/CustomError"
import { MultimediaFilesProduct } from "../../types/Products.types"
import { API_END_POINT, MESSAGE_TOAST_ERROR_TYPE, METHOD, MULTIMEDIA_FILES_PRODUCT_BY_PRODUCT_ID_END_POINT } from "../../utilities/Constants.d"

function useLoadMultimediFileListData(productId: string) {
     const [isLoaded, setIsLoaded] = useState(false)
     const [multimediaFilesProductList, setMultimediaFilesProductList] = useState<MultimediaFilesProduct[]>([] as MultimediaFilesProduct[])

     const { ShowMessageToast } = useShowMessageToast()
     const { tokenResult } = useAuth()

     const populateMultimediaFilesProductList = async () => {
          try {
               const response = await GetList(MULTIMEDIA_FILES_PRODUCT_BY_PRODUCT_ID_END_POINT.URL + productId)
               setMultimediaFilesProductList(response as unknown as MultimediaFilesProduct[]);
               setIsLoaded(true)
          } catch (err) {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          }
     }

     const GetList = (endPoint: string) => {
          return Promise.resolve(
               axios({
                    url: `${API_END_POINT.URL_BASE + endPoint}`,
                    method: METHOD.GET,
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenResult?.accessToken as string}` }
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = err as CustomError;
                         ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
                    })
          )
     }

     useEffect(() => {
          populateMultimediaFilesProductList();
     }, [isLoaded])

     return { multimediaFilesProductList }
}
export default useLoadMultimediFileListData