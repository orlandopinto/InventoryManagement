import { useState } from "react";
import { Row } from "react-bootstrap";
import { MultimediaFilesProduct } from "../../types/Products.types";
import MultimediaFileProductItem from "./MultimediaFileProductItem";
import useLoadMultimediFileListData from "./useLoadMultimediFileListData";

function MultimediaFileProductList({ ...props }) {
     //VARIABLES
     const [newChunkMultimediaFilesProduct, setChunkMultimediaFilesProduct] = useState<MultimediaFilesProduct[][]>([] as MultimediaFilesProduct[][])
     const { multimediaFilesProductList } = useLoadMultimediFileListData(props.productId);

     //STATES
     const [reloadState, setReloadState] = useState(false)

     const chunkMultimediaFilesProduct = multimediaFilesProductList.reduce((resultArray: MultimediaFilesProduct[][], item, index) => {
          const chunkIndex = Math.floor(index / 3)
          if (!resultArray[chunkIndex]) {
               resultArray[chunkIndex] = []
          }
          resultArray[chunkIndex].push(item)
          return resultArray
     }, [])

     //FUNCTIONS
     function reload(id: string) {
          setReloadState(true)
          const newResultArray = [...multimediaFilesProductList].filter(filtro => filtro.id !== id)
          const newChunkMultimediaFilesProductTmp = newResultArray.reduce((resultArray: MultimediaFilesProduct[][], item, index) => {
               const chunkIndex = Math.floor(index / 3)
               if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = []
               }
               resultArray[chunkIndex].push(item)
               return resultArray
          }, [])
          setChunkMultimediaFilesProduct(newChunkMultimediaFilesProductTmp)
     }

     const arrayCounter = (resultArray: MultimediaFilesProduct[][]) => {
          let counterLevelOne: number = 0;
          let counterLevelTwo: number = 0;
          resultArray.map((item) => {
               counterLevelOne = counterLevelOne + 1
               item.map(() => {
                    counterLevelTwo = counterLevelTwo + 1
               })
          })
          return counterLevelOne + counterLevelTwo;
     }

     return (
          (arrayCounter(newChunkMultimediaFilesProduct) < arrayCounter(chunkMultimediaFilesProduct) && reloadState) &&
               arrayCounter(newChunkMultimediaFilesProduct) < arrayCounter(chunkMultimediaFilesProduct)
               ?
               newChunkMultimediaFilesProduct.map((multimediaFilesProductList) => {
                    return (
                         <Row key={self.crypto.randomUUID()} >
                              {
                                   multimediaFilesProductList.map((multimediaFile) => {
                                        return (
                                             <MultimediaFileProductItem key={self.crypto.randomUUID()} multimediaFileProduct={multimediaFile} reload={reload} />
                                        )
                                   })
                              }
                         </Row>
                    )
               })
               :
               chunkMultimediaFilesProduct.map((multimediaFilesProductList) => {
                    return (
                         <Row key={self.crypto.randomUUID()} >
                              {
                                   multimediaFilesProductList.map((multimediaFile) => {
                                        return (
                                             <MultimediaFileProductItem key={self.crypto.randomUUID()} multimediaFileProduct={multimediaFile} reload={reload} />
                                        )
                                   })
                              }
                         </Row>
                    )
               })
     )

}
export default MultimediaFileProductList