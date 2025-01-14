import { useRef, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { CameraVideo, CardImage } from "react-bootstrap-icons";
import { ProductsController } from "../controllers/ProductsController";
import { CustomError } from "../models/CustomError";
import { useTranslation } from 'react-i18next'

import './ModalAddMediaFileProduct.css';

function ModalAddMediaFileProduct(props: any) {
     //VARIABLES
     const imageName: string = ''
     const { show, handleClose, productId, initializeImage, setInitializeImage, initializeVideo, setInitializeVideo, typeFile } = props
     const controller = ProductsController();
     const fileInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
     const buttonInputRef = useRef<HTMLButtonElement>({} as HTMLButtonElement);
     const { t } = useTranslation();


     //STATES
     const [selectedFile, setSelectedFile] = useState('')
     const [selectedVideoFile, setSelectedVideoFile] = useState('')
     const [image, setImage] = useState({} as FormData)
     const [bodyText, setBodyText] = useState('')
     const [showAlert, setShowAlert] = useState(false);

     const handleFileInput = (e: any) => {
          setInitializeImage(false)
          setInitializeVideo(false)
          buttonInputRef.current.disabled = true;
          const formData = new FormData();
          if (e.target.files.length > 0) {
               const objectUrl = URL.createObjectURL(e.target.files[0])
               const extensionFile = e.target.files[0].type.split('/')[1] as string
               formData.append('file', e.target.files[0], imageName + '.' + extensionFile);
               setImage(formData);
               setSelectedFile(objectUrl)
               setSelectedVideoFile(objectUrl)
               fileInputRef.current.files = e.target.files;
               buttonInputRef.current.disabled = false;
          }
     }

     const handleClick = () => {
          setInitializeImage(false)
          setInitializeVideo(false)
          setSelectedFile('')
          setSelectedVideoFile('')

          buttonInputRef.current.disabled = true;
          //console.log('productId: ', productId)
          fileInputRef.current.click();
     }

     const handleClickUploadImage = () => {
          if (fileInputRef.current.files?.length === 0) {
               buttonInputRef.current.disabled = true;
          }
          else {
               UploadMedia();
               buttonInputRef.current.disabled = false
          }
     }

     const UploadMedia = async () => {
          await controller.UploadMedia(productId, image, true).then((response) => {
               handleClose(false)
               //cargar lista en AddUpdateProduct y mostrar la imagen o video agregado
          }).catch(err => {
               showCustomError(err);
          })
     }

     const showCustomError = (err: any) => {
          const error: CustomError = err as CustomError;
          setBodyText(error.message);
          setShowAlert(true);
     }

     return (
          <Modal show={show} onHide={handleClose} centered backdrop="static">
               <Modal.Header closeButton className="pb-0">
                    <Modal.Title>
                         {typeFile === 'image' ? <CardImage size={25} /> : <CameraVideo size={25} />} <span className="ps-2">{t('UploadMediaFile')}</span>
                    </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <div className='modal-body p-0'>
                         {
                              selectedFile === '' || selectedVideoFile === ''
                                   ?
                                   typeFile === 'image'
                                        ?
                                        <div>
                                             <div className="mainSquare" onClick={handleClick}>
                                                  <div className="internalSquare">
                                                       <div className="textBrowseFile">{t('BrowseFileToUpload')}</div>
                                                  </div>
                                             </div>
                                             <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
                                        </div>
                                        :
                                        <div>
                                             <div className="mainSquare" onClick={handleClick}>
                                                  <div className="internalSquare">
                                                       <div className="textBrowseFile">{t('BrowseFileToUpload')}</div>
                                                  </div>
                                             </div>
                                             <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".mp4" style={{ display: 'none' }} />
                                        </div>
                                   :
                                   (
                                        typeFile === 'image'
                                             ?
                                             initializeImage
                                                  ?
                                                  <div>
                                                       <div className="mainSquare" onClick={handleClick}>
                                                            <div className="internalSquare">
                                                                 <div className="textBrowseFile">{t('BrowseFileToUpload')}</div>
                                                            </div>
                                                       </div>
                                                       <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
                                                  </div>
                                                  :
                                                  <div>
                                                       <div className="w-100" style={{ cursor: 'pointer' }}>{<Image src={selectedFile} className="w-100 rounded" onClick={handleClick} title="Haga click en la imagen para seleccionar otra." />}</div>
                                                       <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
                                                  </div>
                                             :
                                             initializeVideo
                                                  ?
                                                  <div>
                                                       <div className="mainSquare" onClick={handleClick}>
                                                            <div className="internalSquare">
                                                                 <div className="textBrowseFile">{t('BrowseFileToUpload')}</div>
                                                            </div>
                                                       </div>
                                                       <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".mp4" style={{ display: 'none' }} />
                                                  </div>
                                                  :
                                                  <div>
                                                       <div className="w-100" style={{ cursor: 'pointer' }}>{<video autoPlay={true} loop muted src={selectedVideoFile} className="w-100 rounded" onClick={handleClick} title="Haga click en el video para seleccionar otro." />}</div>
                                                       <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".mp4" style={{ display: 'none' }} />
                                                  </div>
                                   )

                         }
                    </div>
               </Modal.Body>
               <Modal.Footer className="pt-0 pb-3 d-flex justify-content-center">
                    <div className="w-25">
                         <Button variant="outline-primary" className="button-upload" onClick={handleClickUploadImage}>{typeFile === 'image' ? t('UploadImage') : t('UploadVideo')}</Button>
                    </div>
                    <div className="w-25">
                         <Button className="w-100" variant="outline-info" onClick={handleClose}>{t('Close')}</Button>
                    </div>
               </Modal.Footer>
          </Modal>
     )
}
export default ModalAddMediaFileProduct