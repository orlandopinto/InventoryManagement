import { Button, Modal } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

const ModalDelete = (props: any) => {
     const { show, headerContent, handleClose, handleDelete } = props;
     return (
          <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} className='modal-custom modal-md'>
               <Modal.Header closeButton></Modal.Header>
               <Modal.Body>
                    <div className="modal-custom-content-container">
                         <div className='modal-custom-image'>
                              <XCircle size={55} />
                         </div>
                         <div className='modal-custom-header-content'>
                              {headerContent}
                         </div>
                         <div className='modal-custom-message-content'>
                              El proceso es irreversible, presione 'Eliminar' para continuar
                         </div>
                    </div>
               </Modal.Body>
               <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
               </Modal.Footer>
          </Modal>
     )
}

export default ModalDelete