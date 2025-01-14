import { useRef, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { ProductsController } from "../controllers/ProductsController";
import { CustomError } from "../models/CustomError";


function ModalAddImageToProduct(props: any) {
     //VARIABLES
     const imageName: string = ''
     const { show, handleClose, productId, initializeImage, setInitializeImage } = props
     const controller = ProductsController();
     const fileInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
     const buttonInputRef = useRef<HTMLButtonElement>({} as HTMLButtonElement);

     //STATES
     const [selectedFile, setSelectedFile] = useState('')
     const [image, setImage] = useState({} as FormData)
     const [bodyText, setBodyText] = useState('')
     const [showAlert, setShowAlert] = useState(false);

     const handleFileInput = (e: any) => {
          setInitializeImage(false)
          buttonInputRef.current.disabled = true;
          const formData = new FormData();
          if (e.target.files.length > 0) {
               const objectUrl = URL.createObjectURL(e.target.files[0])
               const extensionFile = e.target.files[0].type.split('/')[1] as string
               formData.append('file', e.target.files[0], imageName + '.' + extensionFile);
               setImage(formData);
               setSelectedFile(objectUrl)
               fileInputRef.current.files = e.target.files;
               buttonInputRef.current.disabled = false;
          }
     }

     const handleClick = () => {
          setInitializeImage(false)
          setSelectedFile('')
          buttonInputRef.current.disabled = true;
          console.log('productId: ', productId)
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
               //console.log('response: ', response)
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
                    <Modal.Title>Subir imagen</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <div className="modal-custom-content-container">
                         <div className='modal-body p-0'>
                              <div className="pb-3">Haga click sobre la imagen</div>
                              <div>
                                   {
                                        selectedFile === ''
                                             ?
                                             <div>
                                                  <div className="">{<Image src="/src/assets/images/default-image.jpg" className="w-100" onClick={handleClick} />}</div>
                                                  <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
                                             </div>
                                             :
                                             (
                                                  initializeImage
                                                       ?
                                                       <div>
                                                            <div className="">{<Image src="/src/assets/images/default-image.jpg" className="w-100" onClick={handleClick} />}</div>
                                                            <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
                                                       </div>
                                                       :
                                                       <div>
                                                            <div className="w-100">{<Image src={selectedFile} className="w-100 rounded" onClick={handleClick} />}</div>
                                                            <Form.Control type="file" onChange={handleFileInput} ref={fileInputRef} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
                                                       </div>
                                             )
                                   }
                              </div>
                         </div>
                    </div>
               </Modal.Body>
               <Modal.Footer className="pt-0 pb-3 d-flex justify-content-center">
                    <div className="w-25">
                         <Button variant="outline-primary" className="button-upload" onClick={handleClickUploadImage}>Subir imagen</Button>
                    </div>
                    <div className="w-25">
                         <Button className="w-100" variant="outline-light" onClick={handleClose}>Cerrar</Button>
                    </div>
               </Modal.Footer>
          </Modal>
     )
}
export default ModalAddImageToProduct