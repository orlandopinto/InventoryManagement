import './Modal.css'
import { Button, Modal, Image } from 'react-bootstrap'
import errorImage from '../../../assets/images/error.svg?react'
import { useNavigate } from 'react-router-dom';

const CustomModalAlert = (props: any) => {
     const navigate = useNavigate();
     const { show, headerText, bodyText, handleClose, hasUrlToRedirect, urlToRedirect } = props;
     return (
          <Modal
               show={show}
               onHide={handleClose}
               centered
               backdrop="static"
               onExit={hasUrlToRedirect as boolean ? () => navigate(urlToRedirect) : undefined}
          >
               <Modal.Header closeButton>
                    <Modal.Title>{headerText}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <div className="modal-custom-content-container">
                         <div className='modal-custom-image'>
                              <Image src={errorImage} width="80" alt="" />
                         </div>
                         <div className='modal-custom-header-content'>
                              {
                                   bodyText.includes('<br>') ?
                                        bodyText.split('<br>').map((message: string, index: number) => (
                                             <div key={index}>{message}<br /></div>
                                        ))
                                        :
                                        bodyText
                              }
                         </div>
                    </div>
               </Modal.Body>
               <Modal.Footer>
                    <Button className='btnAlertModalClose' variant="outline-primary" onClick={handleClose}>
                         Aceptar
                    </Button>
               </Modal.Footer>
          </Modal>
     )
}

export default CustomModalAlert