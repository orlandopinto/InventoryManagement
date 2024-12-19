import { ChangeEvent, useRef, useState } from 'react';
import { useQuery } from "react-query";
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import { initializeCategory, Categories } from '../../types/Categories.d';
import { useAuth } from '../../contexts/useAuth';
import { MESSAGE_TOAST_ERROR_TYPE } from '../../utilities/Constants.d';
import { useShowMessageToast } from '../../hooks/useShowMessageToast';
import Loading from '../index/Loading';
import { CategoriesController } from '../../controllers/CategoriesController';
import { CustomError } from '../../models/CustomError';

function AddUpdateCategory() {
     let IsAddMode: boolean = true;
     const { id } = useParams<string>()
     const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement)
     const { ShowMessageToast } = useShowMessageToast()
     const [validated, setValidated] = useState(false);

     const { tokenResult, user } = useAuth()
     const controller = new CategoriesController(tokenResult as string);

     const [formData, setFormData] = useState<Categories>(initializeCategory);

     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          setFormData({
               ...formData,
               [event.target.id]: event.target.value,
          });
     };

     if (id !== undefined) {
          IsAddMode = false;
          const { isLoading } = useQuery({
               queryKey: ['id', id],
               queryFn: async ({ queryKey }) => {
                    await controller.GetById(queryKey[1] as string).then(fetchData => {
                         if (fetchData !== null) {
                              const response = (fetchData as any).result as Categories
                              setFormData(response)
                         }
                         else {
                              ShowMessageToast("Se produjo un error al consultar los datos de la categoría, por favor intente de nuevo!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
                         }
                    }).catch(error => {
                         ShowMessageToast(error.mess, MESSAGE_TOAST_ERROR_TYPE.ERROR);
                    })
               },
          })

          if (isLoading) {
               return <Loading />
          }
     }

     const AddCategory = async (data: Categories) => {
          data.id = self.crypto.randomUUID();
          data.createBy = user?.userName as string
          console.log(data)
          await controller.Post(data).then(fetchData => {
               if (fetchData === null) {
                    ShowMessageToast("Se produjo un error al agregar la categoría, por favor intente de nuevo!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
               }
               else {
                    setFormData(initializeCategory)
                    inputRef.current?.focus();
                    ShowMessageToast("Categoría registrada satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               }
          }).catch(err => {
               const error: CustomError = err as CustomError
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          })
     }

     const updateCategory = async (data: Categories) => {

          await controller.Put(data).then(fetchData => {
               if (fetchData !== null) {
                    ShowMessageToast("Datos de la categoría actualizada con éxito!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               }
               else {
                    ShowMessageToast("Se produjo un error al actualizar la categoría, por favor intente de nuevo!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
               }
          }).catch(error => {
               ShowMessageToast(error.mess, MESSAGE_TOAST_ERROR_TYPE.ERROR);
               return;
          })
     };

     const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
          event.preventDefault();
          event.stopPropagation();
          const buttonSubmitter = (event.nativeEvent as SubmitEvent).submitter;

          if (event.currentTarget.checkValidity() === false) {
               setValidated(true);
          }
          else {
               let data: Categories = { ...formData, [event.currentTarget.name]: event.currentTarget.value }
               if (buttonSubmitter?.id === 'btnAddCategory') {
                    AddCategory(data)
               }
               else if (buttonSubmitter?.id === 'btnUpdateCategory') {
                    updateCategory(data)
               }
          }
     };
     return (
          <>
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>Gestión de categorías</h4>
                              <p>Agregar/Actualizar Categoría</p>
                         </div>
                    </div>
                    <div>
                         <Form noValidate validated={validated} onSubmit={handleSubmit}>
                              <Card>
                                   <div className='container-fluid pt-2'>
                                        <Row>
                                             <Col md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>Nombre de la categoría</Form.Label>
                                                       <Form.Control type="text" ref={inputRef} id="categoryName" name="categoryName" value={formData.categoryName == null ? "" : formData.categoryName} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col >
                                             <Col md={6} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>Código</Form.Label>
                                                       <Form.Control type="text" id="categoryCode" name="categoryCode" value={formData.categoryCode} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col >
                                        </Row>
                                        <Row>
                                             <Col sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>descripción</Form.Label>
                                                       <Form.Control type="text" id="categoryDescription" name="categoryDescription" value={formData.categoryDescription == null ? "" : formData.categoryDescription} onChange={handleChange} />
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                        <Row>
                                             <Col sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>Ruta imagen</Form.Label>
                                                       <Form.Control type="text" id="categoryImagePath" name="categoryImagePath" value={formData.categoryImagePath} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                        <Row>
                                             <Col xl={12}>
                                                  <Form.Group className="mb-3 buttons-section">
                                                       {IsAddMode
                                                            ?
                                                            <Button id="btnAddCategory" type="submit" variant='primary'>Guardar</Button>
                                                            :
                                                            <Button id="btnUpdateCategory" type="submit" variant='primary' >Actualizar</Button>
                                                       }
                                                       <Link to="/categories" className='btn btn-secondary'><span>Volver</span></Link>
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                   </div>
                              </Card>
                         </Form>
                    </div>
               </div>
          </>
     )
}

export default AddUpdateCategory