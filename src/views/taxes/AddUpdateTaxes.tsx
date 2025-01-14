import { Button, Card, Col, Form, Row } from "react-bootstrap";
import CurrencyInput from 'react-currency-input-field';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import CustomModalAlert from "../../components/common/Modals/CustomModalAlert";
import useAddEditEntity from "../../hooks/useAddEditEntity";
import { initializeTaxesViewModel } from "../../types/Taxes.types.d";
import FormatDate from "../tools/CommonFunctions";
import { TaxesController } from "../../controllers/TaxesController";

function AddUpdateTaxes() {
     const { t } = useTranslation();

     //NOTA: Mantener este orden en que se van a mostrar los mensajes en el Custom Hook
     const messages: string[] = [
          'Se ha alterado el id del impuesto, se redireccionará a la lista de estados, seleccione nuevamente el ícono de actualizar.', //alteredIdMessage
          "El impuesto se ha registrado satisfactoriamente!",                                                                          //addMessage
          "Datos del impuesto actualizado con éxito!",                                                                                 //updateMessage
     ]

     const { IndexPage, showAlert, hasUrlToRedirect, urlToRedirect, bodyText, validated, formData, isAddMode, handleSubmit, handleChange, handleChangeChecked, handleCloseAlert } = useAddEditEntity
          (TaxesController(), initializeTaxesViewModel, messages[0], messages[1], messages[2], '/taxes')

     return (
          <>
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>{t('Taxes')}</h4>
                              <p>{t('Manageyour')} {t('Taxes').toLocaleLowerCase()}</p>
                         </div>
                    </div>
                    <div>
                         <Form noValidate validated={validated} onSubmit={handleSubmit}>
                              <Card>
                                   <div className='container-fluid pt-2'>
                                        <Form.Control type="hidden" id="id" name="id" value="" />
                                        <Row>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>{t('Description')}</Form.Label>
                                                       <Form.Control type="text" id="taxDescription" value={formData.taxDescription} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>{t('Tax')}</Form.Label>
                                                       <CurrencyInput
                                                            maxLength={1}
                                                            decimalSeparator=","
                                                            id="tax"
                                                            name="tax"
                                                            className="form-control"
                                                            defaultValue={0}
                                                            decimalsLimit={2}
                                                            required
                                                            value={formData.tax}
                                                            min="1.00"
                                                            onChange={handleChange}
                                                       />
                                                  </Form.Group>
                                             </Col>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>{t('From')}</Form.Label>
                                                       <Form.Control type="date" id="dateFrom" placeholder="DateRange" value={formData.dateFrom ? FormatDate(formData.dateFrom) : ''} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                        <Row>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>{t('To')}</Form.Label>
                                                       <Form.Control type="date" id="dateTo" placeholder="DateRange" value={formData.dateTo ? FormatDate(formData.dateTo) : ''} onChange={handleChange} />
                                                  </Form.Group>
                                             </Col>
                                             <Col xl={4} md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label></Form.Label>
                                                       <Form.Check type="switch" label={t('Active')} id="active" onChange={handleChangeChecked} defaultChecked={formData.active} />
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

export default AddUpdateTaxes