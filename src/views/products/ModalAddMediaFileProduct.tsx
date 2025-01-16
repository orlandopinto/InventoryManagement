import { useRef, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { CameraVideo, CardImage } from "react-bootstrap-icons";
import { useTranslation } from 'react-i18next';
import { ProductsController } from "../../controllers/ProductsController";
import { CustomError } from "../../models/CustomError";
import './ModalAddMediaFileProduct.css';
import Loading from "../index/Loading";

function ModalAddMediaFileProduct(props: any) {

     //VARIABLES
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
     const [isLoading, setIsLoading] = useState(false)

     //FUNCTIONS
     const handleFileInput = (e: any) => {
          setInitializeImage(false)
          setInitializeVideo(false)
          buttonInputRef.current.disabled = true;
          const formData = new FormData();
          if (e.target.files.length > 0) {
               const objectUrl = URL.createObjectURL(e.target.files[0])
               const extensionFile = e.target.files[0].type.split('/')[1] as string
               formData.append('file', e.target.files[0], `image.${extensionFile}`);
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
          fileInputRef.current.click();
     }

     const handleClickUploadMediaFile = () => {
          if (fileInputRef.current.files?.length === 0) {
               buttonInputRef.current.disabled = true;
          }
          else {
               UploadMedia();
               buttonInputRef.current.disabled = false
          }
     }

     const UploadMedia = async () => {
          setIsLoading(true)
          await controller.UploadMedia(productId, image, true).then((response) => {
               props.setMultimediaFilesProduct(response)
               setIsLoading(false)
               handleClose(false)
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
          <>
               {
                    isLoading && <Loading />
               }
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
                                             <>
                                                  <div className="mainSquare" onClick={handleClick}>
                                                       <div className="internalSquare">
                                                            <div className="textBrowseFile">{t('BrowseFileToUpload')}</div>
                                                       </div>
                                                  </div>
                                                  <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
                                             </>
                                             :
                                             <>
                                                  <div className="mainSquare" onClick={handleClick}>
                                                       <div className="internalSquare">
                                                            <div className="textBrowseFile">{t('BrowseFileToUpload')}</div>
                                                       </div>
                                                  </div>
                                                  <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".mp4" style={{ display: 'none' }} />
                                             </>
                                        :
                                        (
                                             typeFile === 'image'
                                                  ?
                                                  initializeImage
                                                       ?
                                                       <>
                                                            <div className="mainSquare" onClick={handleClick}>
                                                                 <div className="internalSquare">
                                                                      <div className="textBrowseFile">{t('BrowseFileToUpload')}</div>
                                                                 </div>
                                                            </div>
                                                            <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
                                                       </>
                                                       :
                                                       <>
                                                            <div className="w-100" style={{ cursor: 'pointer' }}>{<Image src={selectedFile} className="w-100 rounded" onClick={handleClick} title="Haga click en la imagen para seleccionar otra." />}</div>
                                                            <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
                                                       </>
                                                  :
                                                  initializeVideo
                                                       ?
                                                       <>
                                                            <div className="mainSquare" onClick={handleClick}>
                                                                 <div className="internalSquare">
                                                                      <div className="textBrowseFile">{t('BrowseFileToUpload')}</div>
                                                                 </div>
                                                            </div>
                                                            <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".mp4" style={{ display: 'none' }} />
                                                       </>
                                                       :
                                                       <>
                                                            <div className="w-100" style={{ cursor: 'pointer' }}>{<video autoPlay={true} loop muted src={selectedVideoFile} className="w-100 rounded" onClick={handleClick} title="Haga click en el video para seleccionar otro." />}</div>
                                                            <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".mp4" style={{ display: 'none' }} />
                                                       </>
                                        )

                              }
                         </div>
                    </Modal.Body>
                    <Modal.Footer className="pt-0 pb-3 d-flex justify-content-center">
                         <div className="w-25">
                              <Button variant="outline-primary" className="button-upload" onClick={handleClickUploadMediaFile}>{typeFile === 'image' ? t('UploadImage') : t('UploadVideo')}</Button>
                         </div>
                         <div className="w-25">
                              <Button className="w-100" variant="outline-secondary" onClick={handleClose}>{t('Close')}</Button>
                         </div>
                    </Modal.Footer>
               </Modal>
          </>
     )
}
export default ModalAddMediaFileProduct