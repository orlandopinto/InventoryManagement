import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { MultimediaFilesProduct } from "../../types/Products.types";
import MultimediaFileProductItem from "./MultimediaFileProductItem";
import useLoadMultimediFileListData from "./useLoadMultimediFileListData";

function MultimediaFileProductList({ ...props }) {
     //VARIABLES
     const [newChunksMultimediaFilesProduct, setChunkMultimediaFilesProduct] = useState<MultimediaFilesProduct[][]>([] as MultimediaFilesProduct[][])
     const { multimediaFilesProductList } = useLoadMultimediFileListData(props.productId);
     const chunksMultimediaFilesProduct = multimediaFilesProductList.reduce((multimediaFilesProduct: MultimediaFilesProduct[][], item, index) => {
          const chunkIndex = Math.floor(index / 3)
          if (!multimediaFilesProduct[chunkIndex]) {
               multimediaFilesProduct[chunkIndex] = []
          }
          multimediaFilesProduct[chunkIndex].push(item)
          return multimediaFilesProduct
     }, [])

     //STATES
     const [reloadState, setReloadState] = useState(false)

     //OTHERS
     useEffect(() => {
          reloadToAddedNewMultimediaFile(props.multimediaFilesProduct)
     }, [props.multimediaFilesProduct])

     //FUNCTIONS
     function reload(id: string) {
          setReloadState(true)
          const newMultimediaFilesProductList = [...multimediaFilesProductList].filter(filtro => filtro.id !== id)
          const newChunkMultimediaFilesProductList = newMultimediaFilesProductList.reduce((multimediaFilesProduct: MultimediaFilesProduct[][], item, index) => {
               const chunkIndex = Math.floor(index / 3)
               if (!multimediaFilesProduct[chunkIndex]) {
                    multimediaFilesProduct[chunkIndex] = []
               }
               multimediaFilesProduct[chunkIndex].push(item)
               return multimediaFilesProduct
          }, [])
          setChunkMultimediaFilesProduct(newChunkMultimediaFilesProductList)
     }

     function reloadToAddedNewMultimediaFile(multimediaFilesProduct: MultimediaFilesProduct) {
          if (multimediaFilesProduct.id !== undefined && multimediaFilesProductList.length > 0) {
               setReloadState(true)
               const newMultimediaFilesProductList: MultimediaFilesProduct[] = [...multimediaFilesProductList]
               newMultimediaFilesProductList.push(multimediaFilesProduct)

               const newChunkMultimediaFilesProductList = newMultimediaFilesProductList.reduce((multimediaFilesProduct: MultimediaFilesProduct[][], item, index) => {
                    const chunkIndex = Math.floor(index / 3)
                    if (!multimediaFilesProduct[chunkIndex]) {
                         multimediaFilesProduct[chunkIndex] = []
                    }
                    multimediaFilesProduct[chunkIndex].push(item)
                    return multimediaFilesProduct
               }, [])
               setChunkMultimediaFilesProduct(newChunkMultimediaFilesProductList)
          }
     }

     const arrayCounter = (multimediaFilesProductList: MultimediaFilesProduct[][]) => {
          let counterLevelOne: number = 0;
          let counterLevelTwo: number = 0;
          multimediaFilesProductList.map((filesProductList) => {
               counterLevelOne = counterLevelOne + 1
               filesProductList.map(() => {
                    counterLevelTwo = counterLevelTwo + 1
               })
          })
          return counterLevelOne + counterLevelTwo;
     }

     return (
          (arrayCounter(newChunksMultimediaFilesProduct) < arrayCounter(chunksMultimediaFilesProduct) && reloadState) ||
               (arrayCounter(newChunksMultimediaFilesProduct) > arrayCounter(chunksMultimediaFilesProduct) && reloadState) &&
               arrayCounter(newChunksMultimediaFilesProduct) < arrayCounter(chunksMultimediaFilesProduct) || arrayCounter(newChunksMultimediaFilesProduct) > arrayCounter(chunksMultimediaFilesProduct)
               ?
               newChunksMultimediaFilesProduct.map((multimediaFilesProductList) => {
                    return (
                         <Row key={self.crypto.randomUUID()}>
                              {
                                   multimediaFilesProductList.map((multimediaFile) => {
                                        return <MultimediaFileProductItem key={multimediaFile.id} multimediaFileProduct={multimediaFile} reload={reload} />
                                   })
                              }
                         </Row>
                    )
               })
               :
               chunksMultimediaFilesProduct.map((multimediaFilesProductList) => {
                    return (
                         <Row key={self.crypto.randomUUID()}>
                              {
                                   multimediaFilesProductList.map((multimediaFile) => {
                                        return <MultimediaFileProductItem key={multimediaFile.id} multimediaFileProduct={multimediaFile} reload={reload} />
                                   })
                              }
                         </Row>
                    )
               })
     )

}
export default MultimediaFileProductList