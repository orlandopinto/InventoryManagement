import { Button, Modal } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

const ModalDelete = (props: any) => {
     const { show, headerContent, handleClose, handleDelete } = props;
     const { t } = useTranslation();

     return (
          <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} className='modal-custom modal-md'>
               <Modal.Header closeButton></Modal.Header>
               <Modal.Body>
                    <div className="modal-custom-content-container">
                         <div className='modal-custom-image'>
                              <XCircle size={55} />
                         </div>
                         <div className='modal-custom-header-content'>
                              {headerContent.replace('<br>', '')}
                         </div>
                         <div className='modal-custom-message-content'>
                              {t('IrreversibleMessage')}
                         </div>
                    </div>
               </Modal.Body>
               <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleDelete}>{t('Delete')}</Button>
                    <Button variant="outline-secondary" onClick={handleClose}>{t('Cancel')}</Button>
               </Modal.Footer>
          </Modal>
     )
}

export default ModalDelete