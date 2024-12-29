import { Accordion, Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import { Plus, Trash } from 'react-bootstrap-icons'
import { useState } from 'react'
import './AttributesTable.css'
import DataTablePagination from '../../components/common/DataTable/DataTablePagination'

function index() {
     let rowsPerPageOptions = ['2', '10', '15', '20']
     const [pageSize, setPageSize] = useState<number>(2)
     const [currentPage, setCurrentPage] = useState(1);

     const attributesData = [
          { id: '528f0038-d9c5-416e-bdbf-c81e1d4d2248', AttributeName: 'Colores' },
          { id: '7933ef78-5a7f-4ffe-8c46-a6a79fc88b07', AttributeName: 'Tallas' },
          { id: '8f3f518d-29d8-4160-8ccc-84ed425c7061', AttributeName: 'Corte' }
     ]

     const attributesValuesData = [
          { attributeId: '528f0038-d9c5-416e-bdbf-c81e1d4d2248', id: '4807db9b-79d1-43e4-8e24-07922075438e', AttributeValue: 'Blanco' },
          { attributeId: '528f0038-d9c5-416e-bdbf-c81e1d4d2248', id: '34ee8059-1ea6-490d-9894-176542b7fadf', AttributeValue: 'Gris' },
          { attributeId: '528f0038-d9c5-416e-bdbf-c81e1d4d2248', id: '229ee943-921f-4c72-8f63-1bcbc090e737', AttributeValue: 'Negro' },
          { attributeId: '7933ef78-5a7f-4ffe-8c46-a6a79fc88b07', id: 'd5ead703-71c7-494f-8811-2b0c1911540b', AttributeValue: 'XS' },
          { attributeId: '7933ef78-5a7f-4ffe-8c46-a6a79fc88b07', id: 'd5ead703-71c7-494f-8811-2b0c1911540b', AttributeValue: 'S' },
          { attributeId: '7933ef78-5a7f-4ffe-8c46-a6a79fc88b07', id: 'b3919a03-8d98-4160-9cf0-374c7020e132', AttributeValue: 'M' },
          { attributeId: '7933ef78-5a7f-4ffe-8c46-a6a79fc88b07', id: '2f8d4e82-712d-49e3-afb8-3e583281ffbc', AttributeValue: 'L' },
          { attributeId: '7933ef78-5a7f-4ffe-8c46-a6a79fc88b07', id: '2f8d4e82-712d-49e3-afb8-3e583281ffbc', AttributeValue: 'XL' },
          { attributeId: '8f3f518d-29d8-4160-8ccc-84ed425c7061', id: 'e30290fb-87f1-4911-9a01-4835f65b7194', AttributeValue: 'Ajustado' },
          { attributeId: '8f3f518d-29d8-4160-8ccc-84ed425c7061', id: '3f561d7f-b2a5-48d4-a1f7-6285698e8091', AttributeValue: 'Ancho' }
     ]

     const paginationData = attributesData.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
     );

     const handleOnchangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const _target = e.target as HTMLSelectElement;
          const pageSize = Number(_target.value);
          setPageSize(pageSize)
     }
     return (
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
                              <div className='container-fluid pt-2 py-2 mt-2'>
                                   <div className='d-flex flex-column'>
                                        <div className='d-flex justify-content-start align-content-center'>
                                             <div className='me-2 mt-2'>
                                                  <strong>Nuevo atributo:</strong>
                                             </div>
                                             <div>
                                                  <Form.Group className="mb-3">
                                                       <Form.Control type="text" id="attribute" name="attribute" required />
                                                  </Form.Group>
                                             </div>
                                             <div className="ps-2">
                                                  <Button variant='primary'><Plus size={20}></Plus>Agregar</Button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </Card>
                    </div>
                    <Table className='main-table'>
                         <tbody>
                              <tr>
                                   <td>
                                        <Accordion>
                                             {
                                                  paginationData.map((attribute, index) => (
                                                       <Accordion.Item eventKey={index.toString()} key={index}>
                                                            <Accordion.Header>
                                                                 <div className='d-flex justify-content-between w-100' >
                                                                      <div style={{ paddingLeft: '2rem' }}>{attribute.AttributeName}</div >
                                                                      <div style={{ width: '50px' }}>
                                                                           <Trash size={20}></Trash>
                                                                      </div >
                                                                 </div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                 <Card>
                                                                      <div className='container-fluid pt-2'>
                                                                           <div className='d-flex flex-column'>
                                                                                <div className='d-flex justify-content-start'>
                                                                                     <div className='me-2 mt-2'>
                                                                                          <strong>Nuevo valor de atributo:</strong>
                                                                                     </div>
                                                                                     <div>
                                                                                          <Form.Group className="mb-3">
                                                                                               <Form.Control type="text" id="attribute" name="attribute" required />
                                                                                          </Form.Group>
                                                                                     </div>
                                                                                     <div className="ps-2">
                                                                                          <Button variant='primary'><Plus size={20}></Plus>Agregar</Button>
                                                                                     </div>
                                                                                </div>
                                                                                <div>
                                                                                     <Table striped bordered hover>
                                                                                          <thead>
                                                                                               <tr>
                                                                                                    <th>Values</th>
                                                                                                    <th style={{ width: '50px' }}></th>
                                                                                               </tr>
                                                                                          </thead>
                                                                                          <tbody>{
                                                                                               attributesValuesData.map((attributeValue, index) => {
                                                                                                    if (attributeValue.attributeId === attribute.id) {
                                                                                                         return (
                                                                                                              <tr key={index}>
                                                                                                                   <td>{attributeValue.AttributeValue}</td>
                                                                                                                   <td><Trash size={20}></Trash></td>
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
                              {attributesData.length > 0 &&
                                   <DataTablePagination
                                        itemsCount={attributesData.length}
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
     )
}

export default index