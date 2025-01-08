import { ChangeEvent, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomModalAlert from "../../components/common/Modals/CustomModalAlert";
import { StatusController } from "../../controllers/StatusController";
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { CustomError } from "../../models/CustomError";
import { StatusViewModel, initializeStatusViewModel } from "../../types/Status.types.d";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";

function AddUpdateStatus(data: StatusViewModel) {
     //GLOBAL VARIABLES
     const { t } = useTranslation();
     const location = useLocation();
     const IndexPage: string = '/status';

     //HOOKS AND GENERAL FUNCTIONS
     const { ShowMessageToast } = useShowMessageToast()
     const navigate = useNavigate()
     const RedirectTo = (view: string) => navigate(view)

     //STATES
     const [showAlert, setShowAlert] = useState(false);
     const [hasUrlToRedirect, setHasUrlToRedirect] = useState(false)
     const [urlToRedirect, setUrlToRedirect] = useState('')
     const [bodyText, setBodyText] = useState('')
     const [validated, setValidated] = useState(false);
     const [generatedId, setGeneratedId] = useState('')
     const [formData, setFormData] = useState<StatusViewModel>(initializeStatusViewModel);
     const [isAddMode, setIsAddMode] = useState(true)

     //OTHERS
     let controller = StatusController()

     useEffect(() => {
          if (location.state === null) {
               setShowAlert(true)
               setBodyText('Se ha alterado el id del estado, se redireccionará a la lista de estados, seleccione nuevamente el ícono de actualizar.')
               setHasUrlToRedirect(true)
               setUrlToRedirect(IndexPage)
               setShowAlert(true)
          }
          else {
               setIsAddMode(location.state.addMode)
               setFormData(location.state)
          }
     }, [])

     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          setGeneratedId(generatedId)
          setFormData({
               ...formData,
               [event.target.id]: event.target.value,
          });
     };

     const addStatus = async (data: StatusViewModel) => {
          await controller.Create(data).then(() => {
               setFormData(initializeStatusViewModel)
               ShowMessageToast("El estado se ha registrado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               RedirectTo(IndexPage)
          }).catch(err => {
               showCustomError(err);
          })
     }

     const updateStatus = async (data: StatusViewModel) => {
          await controller.Edit(data).then(() => {
               ShowMessageToast("Datos del estado actualizado con éxito!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               RedirectTo(IndexPage)
          }).catch(err => {
               showCustomError(err);
          })
     };

     const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
          event.preventDefault();
          const buttonSubmitter = (event.nativeEvent as SubmitEvent).submitter;

          if (event.currentTarget.checkValidity() === false) {
               setValidated(true);
          }
          else {
               let data: StatusViewModel = { ...formData }
               if (buttonSubmitter?.id === 'btnAddStatus') {
                    addStatus(data)
               }
               else if (buttonSubmitter?.id === 'btnUpdateStatus') {
                    updateStatus(data)
               }
          }
     };

     const handleCloseAlert = () => setShowAlert(false);

     const showCustomError = (err: any) => {
          const error: CustomError = err as CustomError;
          setBodyText(error.message);
          setShowAlert(true);
     }

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
                                        <Form.Control type="hidden" id="id" name="id" value={generatedId} />
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
                                                                 <Button id="btnAddStatus" type="submit" variant='primary'>{t('Save')}</Button>
                                                                 :
                                                                 <Button id="btnUpdateStatus" type="submit" variant='primary' >{t('Update')}</Button>
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
