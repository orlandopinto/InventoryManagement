import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Image } from 'react-bootstrap';
import { useAuth } from '../../contexts/useAuth';
import ModalDelete from '../../hooks/ModalDelete';
import { useShowMessageToast } from '../../hooks/useShowMessageToast';
import { CustomError } from '../../models/CustomError';
import { MultimediaFilesProduct } from '../../types/Products.types';
import { API_END_POINT, MESSAGE_TOAST_ERROR_TYPE, METHOD, MULTIMEDIA_FILES_PRODUCT_END_POINT } from '../../utilities/Constants.d';
import { useTranslation } from 'react-i18next';

interface Props {
     multimediaFileProduct: MultimediaFilesProduct
     reload: (id: string) => void
}

const MultimediaFileProductItem = ({ multimediaFileProduct, reload }: Props) => {

     const [show, setShow] = useState(false);
     const { ShowMessageToast } = useShowMessageToast()
     const { tokenResult } = useAuth()
     const { t } = useTranslation();

     const handleDelete = async () => {
          try {
               const response = await Delete(MULTIMEDIA_FILES_PRODUCT_END_POINT.URL + multimediaFileProduct.id)
               if (response) {
                    ShowMessageToast("El archivo multimedia se ha eliminado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
                    const result = await DeleteMultimediaFile(multimediaFileProduct.publicId)
                    //TODO: VALIDAR SI SE ELIMINA EL ARCHIVO DE cloudinary, EN CASO NEGATIVO GUARDARLO EN UN ARCHIVO LOG
                    //console.log('result from cloudinary api: ', result)
                    setShow(false);
                    reload(multimediaFileProduct.id);
               }
               else {
                    ShowMessageToast("Se produjo un error al eliminar el archivo multimedia, por favor intente de nuevo!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               }
          } catch (err) {
               const error = err as CustomError
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          }
     }

     const Delete = (endPoint: string) => {
          return Promise.resolve(
               axios({
                    url: `${API_END_POINT.URL_BASE + endPoint}`,
                    method: METHOD.DELETE,
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenResult?.accessToken as string}` }
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = err as CustomError;
                         ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
                    })
          )
     }

     const DeleteMultimediaFile = (public_id: string, ImageEndPoint: string = `http://localhost:4000/upload-product-images/${public_id}`): Promise<string> => {
          return Promise.resolve(
               axios({
                    url: ImageEndPoint,
                    method: METHOD.DELETE,
                    headers: { 'Content-Type': 'application/json' }
               })
                    .then(res => res.data)
                    .catch(err => {
                         const error = new CustomError({ message: err.toString(), name: 'API Error to delete media file', stack: 'handled error' });
                         throw error.throwCustomError()
                    })
          )
     }

     const handleShow = () => {
          setShow(true);
     }

     const handleClose = () => setShow(false);
     return (
          <>
               <Col xl={4} md={6} sm={12} className='p-3'>
                    <article>
                         <figure style={{ height: '100%' }}>
                              {
                                   multimediaFileProduct.type === 'image'
                                        ?
                                        <Image src={multimediaFileProduct.secureUrl} className="w-100" style={{ height: '100%' }} />
                                        :
                                        <video autoPlay={true} loop muted src={multimediaFileProduct.secureUrl} className="w-100" style={{ height: '260px' }} />
                              }
                         </figure>
                         <div className='text-center w-100'>
                              <Button className='w-75' variant="outline-primary" onClick={handleShow}>{t('Delete')}</Button>
                         </div>
                    </article>
                    <hr />
               </Col>
               <ModalDelete show={show} headerContent="¿Realmente quiere eliminar el usuario?" handleClose={handleClose} handleDelete={handleDelete} />
          </>
     )
}

export default MultimediaFileProductItem