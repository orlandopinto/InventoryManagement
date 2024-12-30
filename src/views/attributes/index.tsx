import { Accordion, Button, Card, Form, Table } from 'react-bootstrap'
import { Plus, Trash } from 'react-bootstrap-icons'
import { useEffect, useRef, useState } from 'react'
import { Attributes } from '../../types/Attributes'
import './AttributesTable.css'
import DataTablePagination from '../../components/common/DataTable/DataTablePagination'
import { AttributesController } from '../../controllers/AttributesController'
import { useAuth } from '../../contexts/useAuth'
import { MESSAGE_TOAST_ERROR_TYPE } from '../../utilities/Constants.d'
import { CustomError } from '../../models/CustomError'
import { AttributesViewModel, AttributeValues } from '../../types/Attributes'
import { useShowMessageToast } from '../../hooks/useShowMessageToast'
import Loading from '../index/Loading'
import ModalDelete from '../../hooks/ModalDelete'
import ModalAlert from '../../components/common/Modals/ModalAlert'

function index() {
     let rowsPerPageOptions = ['5', '15', '20', '50']
     const [pageSize, setPageSize] = useState<number>(5)
     const [currentPage, setCurrentPage] = useState(1);
     const { user } = useAuth()
     const { ShowMessageToast } = useShowMessageToast()
     const [isLoading, setIsLoading] = useState(false)
     const attributesContoller = new AttributesController(user?.tokenResult.accessToken as string)
     const [attributesViewModelData, setAttributesViewModelData] = useState<AttributesViewModel>({} as AttributesViewModel)
     const [show, setShow] = useState(false);
     const [showAlert, setShowAlert] = useState(false);
     const [bodyText, setBodyText] = useState('')

     const [idToDelete, setIdToDelete] = useState('')
     const [isAttribute, setIsAttribute] = useState(true)

     //Attributes
     const [attributeName, setAttributeName] = useState('')
     const inputAttributeRef = useRef<HTMLInputElement>({} as HTMLInputElement)
     //Attribute Values
     const [attributeValue, setAttributeValue] = useState('')
     const inputAttributeValueRef = useRef<HTMLInputElement>({} as HTMLInputElement)

     useEffect(() => {
          onGetAttributesData()
     }, [])

     const onGetAttributesData = () => {
          setIsLoading(true)
          attributesContoller.Get().then((response => {
               const data: AttributesViewModel = {
                    attributes: response.attributes.length === 0 ? [] : response.attributes,
                    attributeValues: response.attributeValues.length === 0 ? [] : response.attributeValues
               } as AttributesViewModel
               setAttributesViewModelData(data);
          })).catch((err) => {
               const error = err as CustomError;
               setBodyText(error.message)
               setShowAlert(true)
          }).finally(() => {
               setIsLoading(false)
          });
     }

     const paginationData = attributesViewModelData.attributes === undefined ? [] : attributesViewModelData.attributes.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
     );

     const handleOnchangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const _target = e.target as HTMLSelectElement;
          const pageSize = Number(_target.value);
          setPageSize(pageSize)
     }

     const handleAttributesSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
          event.preventDefault();
          event.stopPropagation();

          const attribute: Attributes = {
               id: self.crypto.randomUUID(),
               attributeName: attributeName
          }
          await attributesContoller.Post(attribute).then(fetchData => {
               setIsLoading(true)
               if (fetchData === null) {
                    setBodyText("Se produjo un error al agregar el atributo, por favor intente de nuevo!")
                    setShowAlert(true)
               }
               else {
                    onGetAttributesData()
                    setAttributeName('')
                    inputAttributeRef.current?.focus();
                    ShowMessageToast("Atributo registrado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               }
          }).catch(err => {
               const error: CustomError = err as CustomError
               setBodyText(error.message)
               setShowAlert(true)
          }).finally(() => {
               setIsLoading(false)
          })
     };

     const handleAttributeValueSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
          event.preventDefault();
          event.stopPropagation();

          const data: AttributeValues = {
               id: self.crypto.randomUUID(),
               attributeId: (event.target as HTMLFormElement)['AttributeId'].value,
               attributeValue: attributeValue
          }

          if (attributesViewModelData.attributeValues.filter(f => f.attributeValue === attributeValue && f.attributeId == data.attributeId).length > 0) {
               setBodyText("El atributo especificado se encuentra registrado, por favor escriba uno diferente!")
               setShowAlert(true)
               return
          }

          await attributesContoller.PostAttributeValues(data).then(fetchData => {
               setIsLoading(true)

               if (fetchData === null) {
                    setBodyText("Se produjo un error al agregar el atributo, por favor intente de nuevo!")
                    setShowAlert(true)
               }
               else {
                    attributesViewModelData.attributeValues = [...attributesViewModelData.attributeValues, data];
                    const newData: AttributesViewModel = {
                         attributes: [...attributesViewModelData.attributes],
                         attributeValues: [...attributesViewModelData.attributeValues.filter(f => f.id !== idToDelete)]
                    } as AttributesViewModel
                    setAttributesViewModelData(newData);

                    setAttributeValue('')
                    inputAttributeValueRef.current.focus()
                    ShowMessageToast("Atributo registrado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               }
          }).catch(err => {
               const error: CustomError = err as CustomError
               setBodyText(error.message)
               setShowAlert(true)
          }).finally(() => {
               setIsLoading(false)
          })
     };

     const handleShow = (id: string, isAttibute: boolean) => {
          setShow(true);
          setIdToDelete(id);
          setIsAttribute(isAttibute)
     }

     const handleClose = () => setShow(false);
     const handleCloseAlert = () => setShowAlert(false);

     const handleDeleteAttribute = async () => {
          await attributesContoller.Delete(idToDelete).then((response => {
               if (response as unknown as boolean !== true) {
                    setBodyText("Se ha producido un error al eliminar el atributo.")
                    setShowAlert(true)
                    return;
               }
               onGetAttributesData();
               ShowMessageToast("Atributo eliminado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               setShow(false);
          })).catch((err) => {
               const error = err as CustomError
               setBodyText(error.message)
               setShowAlert(true)

          });
     }

     const handleDeleteAttributeValue = async () => {
          await attributesContoller.DeleteAttributeValue(idToDelete).then((response => {
               if (response as unknown as boolean !== true) {
                    setBodyText("Se ha producido un error al eliminar el valor del atributo.")
                    setShowAlert(true)
                    return;
               }

               const data: AttributesViewModel = {
                    attributes: [...attributesViewModelData.attributes],
                    attributeValues: [...attributesViewModelData.attributeValues.filter(f => f.id !== idToDelete)]
               } as AttributesViewModel
               setAttributesViewModelData(data);
               ShowMessageToast("El valor del atributo fue eliminado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               setShow(false);
          })).catch((err) => {
               const error = err as CustomError
               setBodyText(error.message)
               setShowAlert(true)
          });
     }

     const resetInputValue = () => {
          setAttributeValue('');
          inputAttributeValueRef.current.focus()
     }

     return (
          <>
               {
                    isLoading && <Loading />
               }
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>Atributos</h4>
                              <p>Gestione sus atributos</p>
                         </div>
                    </div>
                    <Card className='main-card'>
                         <div className='container-fluid pt-2 py-2'>
                              <Card>
                                   <Form onSubmit={handleAttributesSubmit}>
                                        <div className='container-fluid pt-2 py-2 mt-2'>
                                             <div className='d-flex flex-column'>
                                                  <div className='d-flex justify-content-start align-content-center'>
                                                       <div className='me-2 mt-2'>
                                                            <strong>Nuevo atributo:</strong>
                                                       </div>
                                                       <div>
                                                            <Form.Group className="mb-3">
                                                                 <Form.Control type="text" id="attributeName" name="attributeName" ref={inputAttributeRef} value={attributeName} onChange={(e) => setAttributeName(e.target.value)} required />
                                                            </Form.Group>
                                                       </div>
                                                       <div className="ps-2">
                                                            <Button id="btnAddAttribute" type="submit" variant='primary'><Plus size={20}></Plus>Agregar</Button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </Form>
                              </Card>
                         </div>
                         <Table className='main-table'>
                              <tbody>
                                   <tr>
                                        <td>
                                             <Accordion onSelect={resetInputValue}>
                                                  {
                                                       paginationData.map((attribute, index) => (
                                                            <Accordion.Item eventKey={index.toString()} key={index}>
                                                                 <div className="delete-section" style={{ width: '50px' }}>
                                                                      <Trash style={{ cursor: 'pointer' }} id-data={attribute.id} size={20} onClick={() => { handleShow(attribute.id, true) }}></Trash>
                                                                 </div>
                                                                 <Accordion.Header>
                                                                      <div style={{ paddingLeft: '2rem' }}>{attribute.attributeName}</div >
                                                                 </Accordion.Header>
                                                                 <Accordion.Body>
                                                                      <Card>
                                                                           <div className='container-fluid pt-2'>
                                                                                <div className='d-flex flex-column'>
                                                                                     <Form onSubmit={handleAttributeValueSubmit}>
                                                                                          <div className='d-flex justify-content-start'>
                                                                                               <div className='me-2 mt-2'>
                                                                                                    <strong>Nuevo valor de atributo:</strong>
                                                                                               </div>
                                                                                               <div>
                                                                                                    <Form.Control type="hidden" id="AttributeId" name="AttributeId" value={attribute.id} />
                                                                                                    <Form.Group className="mb-3">
                                                                                                         <Form.Control type="text" id="AttributeValue" name="AttributeValue" ref={inputAttributeValueRef} value={attributeValue} onChange={(e) => setAttributeValue(e.target.value)} required />
                                                                                                    </Form.Group>
                                                                                               </div>
                                                                                               <div className="ps-2">
                                                                                                    <Button id="btnAddAttributeValue" type="submit" variant='primary'><Plus size={20}></Plus>Agregar</Button>
                                                                                               </div>
                                                                                          </div>
                                                                                     </Form>
                                                                                     <div>
                                                                                          <Table striped bordered hover>
                                                                                               <thead>
                                                                                                    <tr>
                                                                                                         <th>Values</th>
                                                                                                         <th style={{ width: '50px' }}></th>
                                                                                                    </tr>
                                                                                               </thead>
                                                                                               <tbody>{
                                                                                                    attributesViewModelData.attributeValues.map((attributeValue, index) => {
                                                                                                         if (attributeValue.attributeId === attribute.id) {
                                                                                                              return (
                                                                                                                   <tr key={index}>
                                                                                                                        <td>{attributeValue.attributeValue}</td>
                                                                                                                        <td><Trash size={20} style={{ cursor: 'pointer' }} onClick={() => { handleShow(attributeValue.id, false) }}></Trash></td>
                                                                                                                   </tr>
                                                                                                              )
                                                                                                         }
                                                                                                    })
                                                                                               }
                                                                                               </tbody>
                                                                                          </Table>
                                                                                     </div>
                                                                                </div>
                                                                           </div>
                                                                      </Card>
                                                                 </Accordion.Body>
                                                            </Accordion.Item>
                                                       ))
                                                  }
                                             </Accordion>
                                        </td>
                                   </tr>
                              </tbody>
                         </Table>
                         <div className='pagination-footer'>
                              <div className='show-per-page'>
                                   <div>Mostrar por página:</div>
                                   <div>
                                        <Form.Select size="sm" value={pageSize} onChange={handleOnchangeSelect}>
                                             {rowsPerPageOptions.map((option, index) => (
                                                  <option key={index} value={option}>{option}</option>
                                             ))}
                                        </Form.Select>
                                   </div>
                              </div>
                              <div >
                                   {attributesViewModelData.attributes && attributesViewModelData.attributes.length > 0 &&
                                        <DataTablePagination
                                             itemsCount={attributesViewModelData.attributes.length}
                                             itemsPerPage={pageSize}
                                             currentPage={currentPage}
                                             setCurrentPage={setCurrentPage}
                                             alwaysShown={true}
                                        />
                                   }
                              </div>
                         </div>

                    </Card>
               </div>
               <ModalDelete show={show} headerContent={`¿Realmente quiere eliminar el ${isAttribute ? 'atributo' : 'valor del atributo'}?`} handleClose={handleClose} handleDelete={isAttribute ? handleDeleteAttribute : handleDeleteAttributeValue} />
               <ModalAlert show={showAlert} headerText={'Error'} bodyText={bodyText} handleClose={handleCloseAlert} />
          </>
     )
}

export default index