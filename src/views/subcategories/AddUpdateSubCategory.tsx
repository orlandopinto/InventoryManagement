import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useQuery } from "react-query";
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import { initializeSubCategory, SubCategories, SubCategoriesViewModel } from '../../types/SubCategories.d';
import { useAuth } from '../../contexts/useAuth';
import { MESSAGE_TOAST_ERROR_TYPE } from '../../utilities/Constants.d';
import { useShowMessageToast } from '../../hooks/useShowMessageToast';
import Loading from '../index/Loading';
import { CategoriesController } from '../../controllers/CategoriesController';
import { SubCategoriesController } from '../../controllers/SubCategoriesController';
import { CustomError } from '../../models/CustomError';
import { Categories } from '../../types/Categories';

function AddUpdateSubCategory() {
     //GLOBAL VARIABLES
     let IsAddMode: boolean = true;
     //HOOKS
     const { id } = useParams<string>()
     const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement)
     const { ShowMessageToast } = useShowMessageToast()
     const { tokenResult, user } = useAuth()
     //STATES
     const [validated, setValidated] = useState(false);
     const [generatedId, setGeneratedId] = useState('')
     const [categoryCode, setCategoryCode] = useState('')
     const [categoryID, setCategoryID] = useState('')
     const [categoryList, setCategoryList] = useState<Categories[]>([] as Categories[])
     const [formData, setFormData] = useState<SubCategories>(initializeSubCategory);
     //OTHERS
     const controller = new SubCategoriesController(tokenResult?.accessToken as string);

     useEffect(() => {
          const currentId = (id !== undefined ? id : self.crypto.randomUUID()) as string;
          setGeneratedId(currentId);
          onGetCategoryList();
     }, [])

     const onGetCategoryList = async () => {
          const controller = new CategoriesController(tokenResult?.accessToken as string);
          await controller.Get().then(response => {
               if (response !== null) {
                    setCategoryList(response as unknown as Categories[])
               }
               else {
                    ShowMessageToast("Se produjo un error al consultar las categorías, por favor intente de nuevo!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
               }
          }).catch(error => {
               ShowMessageToast(error.mess, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          })
     }

     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          setGeneratedId(generatedId)
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
                              const response = fetchData as unknown as SubCategoriesViewModel
                              setFormData(response)
                              setCategoryID(response.categoryID)
                              setCategoryCode(response.categoryCode)
                         }
                         else {
                              ShowMessageToast("Se produjo un error al consultar los datos de la sub categoría, por favor intente de nuevo!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
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

     const AddCategory = async (data: SubCategories) => {
          data.createBy = user?.fullName as string
          await controller.Post(data).then(fetchData => {
               if (fetchData === null) {
                    ShowMessageToast("Se produjo un error al agregar la sub categoría, por favor intente de nuevo!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
               }
               else {
                    setFormData(initializeSubCategory)
                    inputRef.current?.focus();
                    ShowMessageToast("Sub categoría registrada satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
                    setGeneratedId(self.crypto.randomUUID());
               }
          }).catch(err => {
               const error: CustomError = err as CustomError
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          })
     }

     const updateCategory = async (data: SubCategories) => {
          await controller.Put(data).then(fetchData => {
               if (fetchData !== null) {
                    ShowMessageToast("Datos de la sub categoría actualizada con éxito!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               }
               else {
                    ShowMessageToast("Se produjo un error al actualizar la sub categoría, por favor intente de nuevo!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
               }
          }).catch(err => {
               const error: CustomError = err as CustomError
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
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
               let data: SubCategories = { ...formData }
               if (buttonSubmitter?.id === 'btnAddSubCategory') {
                    AddCategory(data)
               }
               else if (buttonSubmitter?.id === 'btnUpdateSubCategory') {
                    updateCategory(data)
               }
          }
     };

     const handleOnchangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
          event.preventDefault();
          if (event.target.value !== '') {
               setCategoryID(event.target.value)
               setCategoryCode(categoryList.find(x => x.id === event.target.value)?.categoryCode as string)
          } else {
               setCategoryID('')
               setCategoryCode('')
          }
     }

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
                                             <Col md={4} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>Código</Form.Label>
                                                       <Form.Select required value={formData.categoryID = categoryID} id={categoryID} name={categoryID} onChange={handleOnchangeSelect}>
                                                            <option value="">Selecciona categoría</option>
                                                            {categoryList.map((option, index) => (
                                                                 <option key={index} value={option.id}>{option.categoryName}</option>
                                                            ))}
                                                       </Form.Select>
                                                  </Form.Group>
                                             </Col>
                                             <Col md={4} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>Código</Form.Label>
                                                       <Form.Control type="text" id={categoryCode} value={categoryCode} readOnly />
                                                  </Form.Group>
                                             </Col>
                                             <Col md={4} sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>Sub categoría</Form.Label>
                                                       <Form.Control type="text" ref={inputRef} id="subCategoryName" name="subCategoryName" value={formData.subCategoryName == null ? "" : formData.subCategoryName} onChange={handleChange} required />
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                        <Row>
                                             <Col sm={12}>
                                                  <Form.Group className="mb-3">
                                                       <Form.Label>Descripción</Form.Label>
                                                       <Form.Control type="text" id="subCategoryDescription" name="subCategoryDescription" value={formData.subCategoryDescription == null ? "" : formData.subCategoryDescription} onChange={handleChange} />
                                                  </Form.Group>
                                             </Col>
                                        </Row>
                                        <Row>
                                             <Col xl={12}>
                                                  <Form.Group className="mb-3 buttons-section">
                                                       {IsAddMode
                                                            ?
                                                            <Button id="btnAddSubCategory" type="submit" variant='primary'>Guardar</Button>
                                                            :
                                                            <Button id="btnUpdateSubCategory" type="submit" variant='primary' >Actualizar</Button>
                                                       }
                                                       <Link to="/subcategories" className='btn btn-secondary'><span>Volver</span></Link>
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

export default AddUpdateSubCategory