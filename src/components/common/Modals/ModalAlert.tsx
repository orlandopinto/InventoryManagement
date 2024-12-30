import './Modal.css'
import { Button, Modal, Image } from 'react-bootstrap'
import errorImage from '../../../assets/images/error.svg?react'

function ModalAlert(props: any) {
     const { show, headerText, bodyText, handleClose } = props;
     return (
          <Modal show={show} onHide={handleClose} centered backdrop="static">
               <Modal.Header closeButton>
                    <Modal.Title>{headerText}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <div className="modal-custom-content-container">
                         <div className='modal-custom-image'>
                              <Image src={errorImage} width="80" alt="" />
                         </div>
                         <div className='modal-custom-header-content'>
                              {bodyText}
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

export default ModalAlert