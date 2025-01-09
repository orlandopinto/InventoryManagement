import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import CustomModalAlert from "../../components/common/Modals/CustomModalAlert";
import { StatusController } from "../../controllers/StatusController";
import useAddEditEntity from "../../hooks/useAddEditEntity";
import { StatusViewModel, initializeStatusViewModel } from "../../types/Status.types.d";

function AddUpdateStatus(data: StatusViewModel) {
     const { t } = useTranslation();

     //NOTA: Mantener este orden en que se van a mostrar los mensajes en el Custom Hook
     const messages: string[] = [
          'Se ha alterado el id del impuesto, se redireccionará a la lista de estados, seleccione nuevamente el ícono de actualizar.', //alteredIdMessage
          "El impuesto se ha registrado satisfactoriamente!",                                                                          //addMessage
          "Datos del impuesto actualizado con éxito!",                                                                                 //updateMessage
     ]

     const { IndexPage, showAlert, hasUrlToRedirect, urlToRedirect, bodyText, validated, formData, isAddMode, handleSubmit, handleChange, handleCloseAlert } = useAddEditEntity
          (StatusController(), initializeStatusViewModel, messages[0], messages[1], messages[2], '/status')

     return (
          <>
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>{t('Status')}</h4>
                              <p>{t('Manageyour')} {t('Status').toLocaleLowerCase()}</p>
                         </div>
                    </div>
                    <div>
                         <Form noValidate validated={validated} onSubmit={handleSubmit}>
                              <Card>
                                   <div className='container-fluid pt-2'>
                                        <Row>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>{t('Description')}</Form.Label>
                                                       <Form.Control type="text" id="statusDescription" value={formData.statusDescription} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                        <Row>
                                             <Col xl={12}>
                                                  <Form.Group className="mb-3 buttons-section">
                                                       {
                                                            isAddMode
                                                                 ?
                                                                 <Button id="btnAdd" type="submit" variant='primary'>{t('Save')}</Button>
                                                                 :
                                                                 <Button id="btnUpdate" type="submit" variant='primary' >{t('Update')}</Button>
                                                       }
                                                       <Link to={IndexPage} className='btn btn-secondary'><span>{t('Back')}</span></Link>
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                   </div>
                              </Card>
                         </Form>
                    </div>
                    <CustomModalAlert show={showAlert} headerText={'Error'} bodyText={bodyText} handleClose={handleCloseAlert} hasUrlToRedirect={hasUrlToRedirect} urlToRedirect={urlToRedirect} />
               </div>
          </>
     )
}

export default AddUpdateStatus
