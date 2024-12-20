import React, { useEffect, useState } from 'react'
import { CategoriesController } from '../../controllers/CategoriesController';
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";
import { Categories } from '../../types/Categories';
import { useAuth } from '../../contexts/useAuth';
import { CustomError } from '../../models/CustomError';
import { Card, Form, Table } from 'react-bootstrap';
import CustomPagination from '../../components/common/CustomPagination';
import * as Icon from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import Loading from '../index/Loading';
import ModalDelete from '../../hooks/ModalDelete';
import { TokenResult } from '../../interfaces/IAccount';

function index() {

     const { tokenResult } = useAuth()

     let controller = new CategoriesController(tokenResult?.accessToken as string)
     const { ShowMessageToast } = useShowMessageToast()

     /*** ..:: [ PAGE SIZE ] ::.. ***/
     const [pageSize, setPageSize] = useState(3)
     /***********************************/

     const [isLoading, setIsLoading] = useState(false)
     const [data, setData] = useState<Categories[]>([]);
     const [searchFilter, setSearchFilter] = useState('');
     const [currentPage, setCurrentPage] = useState(1);
     const [show, setShow] = useState(false);
     const [idToDelete, setIdToDelete] = useState('')

     useEffect(() => {
          onGetData();
     }, [])

     const onGetData = () => {
          setIsLoading(true)
          controller.Get().then((data => {
               setData(data.result as Categories[]);
          })).catch((err) => {
               const error = err as CustomError;
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          }).finally(() => {
               setIsLoading(false)
          });
     }

     const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          setSearchFilter(e.target.value);
     };

     const filteredData = data.filter((item) => item.categoryName?.toLowerCase().includes(searchFilter.toLowerCase()));

     const paginatedData = filteredData.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
     );

     const handleOnchangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const _target = e.target as HTMLSelectElement;
          const pageSize: any = _target.value
          setPageSize(pageSize)
     }

     const handleDelete = async () => {
          await controller.Delete(idToDelete).then((data => {
               onGetData();
               ShowMessageToast("categoría eliminada satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
               setShow(false);
          })).catch((err) => {
               const error = err as CustomError
               ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
          });
     }

     const handleClose = () => setShow(false);
     const handleShow = (id: string) => {
          setShow(true);
          setIdToDelete(id);
     }

     return (
          <>
               {
                    isLoading
                         ?
                         <Loading />
                         :
                         <div>
                              <div className='header-page'>
                                   <div>
                                        <h4>Categorías</h4>
                                        <p>Gestione sus categorías</p>
                                   </div>
                                   <div><Link to="/categories/AddUpdateCategory" className='btn btn-primary'><Icon.Plus size={20} /><span>Agregar categoria</span></Link></div>
                              </div>
                              <div>
                                   <Card>
                                        <div className='container-fluid pt-2'>
                                             <div className='search-bar'>
                                                  <div>
                                                       <input
                                                            style={{ width: "200px" }}
                                                            className='form-control mb-2'
                                                            placeholder='Buscar'
                                                            value={searchFilter}
                                                            onChange={handleFilter}
                                                       />
                                                  </div>
                                                  <div className="search-bar-right-icons">
                                                       <Icon.FilePdf size={20}></Icon.FilePdf>
                                                       <Icon.FileSpreadsheet size={20}></Icon.FileSpreadsheet>
                                                       <Icon.PrinterFill size={20}></Icon.PrinterFill>
                                                  </div>
                                             </div>

                                             <Table className='table-xl'>
                                                  <thead className='thead-dark'>
                                                       <tr>
                                                            <th>Nombre de la categoría</th>
                                                            <th>Código</th>
                                                            <th>Descripción</th>
                                                            <th>Fecha creación</th>
                                                            <th className='table-header-icons'></th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {paginatedData.length > 0 ? (
                                                            paginatedData.map((category, i) => (
                                                                 <tr key={i}>
                                                                      <td>{category.categoryName}</td>
                                                                      <td>{category.categoryCode}</td>
                                                                      <td>{category.categoryDescription}</td>
                                                                      <td>{category.createBy}</td>
                                                                      <td style={{ width: 100 }} >
                                                                           <div className='table-row-icons'>
                                                                                <Link to={`/categories/AddUpdateCategory/${category.id}`}><Icon.PencilSquare className='table-row-icon' size={20}></Icon.PencilSquare></Link>
                                                                                <Icon.Trash size={20} onClick={() => { handleShow(category.id) }}></Icon.Trash>
                                                                           </div>
                                                                      </td>
                                                                 </tr>
                                                            ))
                                                       ) : (
                                                            <tr><td colSpan={5}>No se encontraron datos</td></tr>
                                                       )}
                                                  </tbody>
                                             </Table>
                                             <div className='pagination-footer'>
                                                  <div className='show-per-page'>
                                                       <div>Mostrar por página:</div>
                                                       <div>
                                                            <Form.Select size="sm" value={pageSize} onChange={handleOnchangeSelect}>
                                                                 <option value={3}>3</option>
                                                                 <option value={4}>4</option>
                                                                 <option value={6}>6</option>
                                                            </Form.Select>
                                                       </div>
                                                  </div>
                                                  <div>
                                                       {filteredData.length > 0 &&
                                                            <>
                                                                 <CustomPagination
                                                                      itemsCount={filteredData.length}
                                                                      itemsPerPage={pageSize}
                                                                      currentPage={currentPage}
                                                                      setCurrentPage={setCurrentPage}
                                                                      alwaysShown={true}
                                                                 />
                                                            </>
                                                       }
                                                  </div>

                                             </div>
                                        </div>
                                   </Card>
                              </div>
                         </div>
               }
               <ModalDelete show={show} headerContent="¿Realmente quiere eliminar la categoría?" handleClose={handleClose} handleDelete={handleDelete} />
          </>
     )
}

export default index