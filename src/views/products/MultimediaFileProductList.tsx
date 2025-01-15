import { Row } from "react-bootstrap";
import { MultimediaFilesProduct } from "../../types/Products.types";
import MultimediaFileProductItem from "./MultimediaFileProductItem";
import useLoadMultimediFileListData from "./useLoadMultimediFileListData";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { CustomError } from "../../models/CustomError";
import { API_END_POINT, METHOD, MESSAGE_TOAST_ERROR_TYPE, MULTIMEDIA_FILES_PRODUCT_BY_PRODUCT_ID_END_POINT } from "../../utilities/Constants.d";
import { useAuth } from "../../contexts/useAuth";

function MultimediaFileProductList({ ...props }) {

     // const { tokenResult } = useAuth()

     // const [multimediaFilesProductList, setMultimediaFilesProductList] = useState<MultimediaFilesProduct[]>([] as MultimediaFilesProduct[])


     // const loadProfile = useCallback(async () => {
     //      const result = await GetList(MULTIMEDIA_FILES_PRODUCT_BY_PRODUCT_ID_END_POINT.URL + props.productId)
     //      setMultimediaFilesProductList(result);
     // }, [multimediaFilesProductList])


     // const GetList = (endPoint: string) => {
     //      return Promise.resolve(
     //           axios({
     //                url: `${API_END_POINT.URL_BASE + endPoint}`,
     //                method: METHOD.GET,
     //                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenResult?.accessToken as string}` }
     //           })
     //                .then(res => res.data)
     //                .catch(err => {
     //                     const error = err as CustomError;
     //                     //ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
     //                })
     //      )
     // }

     const { multimediaFilesProductList } = useLoadMultimediFileListData(props.productId);

     const chunkMultimediaFilesProduct = multimediaFilesProductList.reduce((resultArray: MultimediaFilesProduct[][], item, index) => {
          const chunkIndex = Math.floor(index / 3)
          if (!resultArray[chunkIndex]) {
               resultArray[chunkIndex] = []
          }
          resultArray[chunkIndex].push(item)
          return resultArray
     }, [])


     return (
          chunkMultimediaFilesProduct.map((multimediaFilesProductList) => {
               return (
                    <Row key={self.crypto.randomUUID()} >
                         {
                              multimediaFilesProductList.map((multimediaFile) => {
                                   return (
                                        <MultimediaFileProductItem key={self.crypto.randomUUID()} {...multimediaFile} />
                                   )
                              })
                         }
                    </Row>
               )
          })

     )

}
export default MultimediaFileProductList