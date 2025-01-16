import { ChangeEvent, useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';

import { useAuth } from '../../contexts/useAuth';
import { useShowMessageToast } from '../../hooks/useShowMessageToast';

import { MESSAGE_TOAST_ERROR_TYPE } from '../../utilities/Constants.d';
import { Discount, initializeDiscount } from '../../types/Discount.type.d';

import { CustomError } from '../../models/CustomError';
import { DiscountsController } from '../../controllers/DiscountsController';

import Loading from '../index/Loading';
import ModalAlert from '../../components/common/Modals/ModalAlert';

function AddUpdateDiscount() {
     //GLOBAL VARIABLES
     let IsAddMode: boolean = true;

     //HOOKS
     const { id } = useParams<string>()
     const { ShowMessageToast } = useShowMessageToast()
     const { tokenResult, user } = useAuth()
     const navigate = useNavigate()

     //STATES
     const [showAlert, setShowAlert] = useState(false);
     const [bodyText, setBodyText] = useState('')
     const [validated, setValidated] = useState(false);
     const [generatedId, setGeneratedId] = useState('')
     const [formData, setFormData] = useState<Discount>(initializeDiscount);

     //OTHERS
     const controller = new DiscountsController(tokenResult?.accessToken as string);

     useEffect(() => {
          const currentId = (id !== undefined ? id : self.crypto.randomUUID()) as string;
          setGeneratedId(currentId);
     }, [])

     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          setGeneratedId(generatedId)
          setFormData({
               ...formData,
               [event.target.id]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
          });
     };

     if (id !== undefined) {
          IsAddMode = false;
          const { isLoading } = useQuery({
               queryKey: ['id', id],
               queryFn: async ({ queryKey }) => {
                    await controller.GetById(queryKey[1] as string).then(fetchData => {
                         if (fetchData !== null) {
                              const response = fetchData as unknown as Discount
                              setFormData(response)
                         }
                         else {
                              setBodyText("Se produjo un error al consultar los datos del descuento, por favor intente de nuevo!")
                              setShowAlert(true)
                              setGeneratedId(self.crypto.randomUUID());
                         }
                    }).catch(error => {
                         setBodyText(error.message)
                         setShowAlert(true)
                    })
               },
          })

          if (isLoading) {
               return <Loading />
          }
     }

     const addDiscount = async (data: Discount) => {
          data.createBy = user?.fullName.trim() as string
          await controller.Post(data).then(fetchData => {
               if (fetchData === null) {
                    setBodyText("Se produjo un error al agregar el descuento, por favor intente de nuevo!")
                    setShowAlert(true)
               }
               else {
                    setFormData(initializeDiscount)
                    ShowMessageToast("El descuento se ha registrado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
                    navigate('/discounts')
               }
          }).catch(err => {
               const error: CustomError = err as CustomError
               setBodyText(error.message)
               setShowAlert(true)
          })
     }

     const updateDiscount = async (data: Discount) => {
          await controller.Put(data).then(fetchData => {
               if (fetchData !== null) {
                    ShowMessageToast("Datos del descuento actualizado con éxito!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
                    navigate('/discounts')
               }
               else {
                    setBodyText("Se produjo un error  al actualizar el descuento, por favor intente de nuevo!")
                    setShowAlert(true)
               }
          }).catch(err => {
               const error: CustomError = err as CustomError
               setBodyText(error.message)
               setShowAlert(true)
          })
     };

     const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
          event.preventDefault();
          const buttonSubmitter = (event.nativeEvent as SubmitEvent).submitter;

          if (event.currentTarget.checkValidity() === false) {
               setValidated(true);
          }
          else {
               let data: Discount = { ...formData }
               if (buttonSubmitter?.id === 'btnAddDiscount') {
                    addDiscount(data)
               }
               else if (buttonSubmitter?.id === 'btnUpdateDiscount') {
                    updateDiscount(data)
               }
          }
     };

     const handleCloseAlert = () => setShowAlert(false);

     return (
          <>
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>Gestión de Sub Categorías</h4>
                              <p>Agregar/Actualizar Sub Categoría</p>
                         </div>
                    </div>
                    <div>
                         <Form noValidate validated={validated} onSubmit={handleSubmit}>
                              <Card>
                                   <div className='container-fluid pt-2'>
                                        <Form.Control type="hidden" id="id" name="id" value={generatedId} />
                                        <Row>
                                             <Col md={8} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>{t('Description')}</Form.Label>
                                                       <Form.Control type="text" id="discountDescription" value={formData.discountDescription} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col>
                                             <Col md={2} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>{t('Discount')}</Form.Label>
                                                       <Form.Control type="number" id="discount" name="discount" value={formData.discount} onChange={handleChange} min="0" required />
                                                  </Form.Group>
                                             </Col>
                                             <Col md={2} sm={12}>
                                                  <Form.Group className="mb-3" style={{ marginTop: '1rem' }}>
                                                       <Form.Label></Form.Label>
                                                       <Form.Check type="checkbox" label={t('Active')} id="active" onChange={handleChange} checked={formData.active} />
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                        <Row>
                                             <Col xl={12}>
                                                  <Form.Group className="mb-3 buttons-section">
                                                       {IsAddMode
                                                            ?
                                                            <Button id="btnAddDiscount" type="submit" variant='primary'>Guardar</Button>
                                                            :
                                                            <Button id="btnUpdateDiscount" type="submit" variant='primary' >Actualizar</Button>
                                                       }
                                                       <Link to="/discounts" className='btn btn-secondary'><span>Volver</span></Link>
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                   </div>
                              </Card>
                         </Form>
                    </div>
                    <ModalAlert show={showAlert} headerText={'Error'} bodyText={bodyText} handleClose={handleCloseAlert} />
               </div>
          </>
     )
}

export default AddUpdateDiscount