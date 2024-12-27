import React, { useEffect, useState } from 'react'
import { UsersController } from '../../controllers/UsersController';
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";
import { Users } from '../../types/Users';
import { useAuth } from '../../contexts/useAuth';
import { CustomError } from '../../models/CustomError';
import { Card, Form, Table } from 'react-bootstrap';
import CustomPagination from '../../components/common/CustomPagination';
import * as Icon from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import Loading from '../index/Loading';
import ModalDelete from '../../hooks/ModalDelete';

function index() {

     const { tokenResult } = useAuth()
     let controller = new UsersController(tokenResult?.refreshToken as string)
     const { ShowMessageToast } = useShowMessageToast()

     /*** ..:: [ PAGE SIZE ] ::.. ***/
     const [pageSize, setPageSize] = useState(6)
     /***********************************/

     const [isLoading, setIsLoading] = useState(false)
     const [data, setData] = useState<Users[]>([]);
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
               setData(data as Users[]);
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

     const filteredData = searchFilter === '' ? data :
          data.filter(
               (item) => item.email?.toLowerCase().includes(searchFilter.toLowerCase())
                    || item.firstName?.toLowerCase().includes(searchFilter.toLowerCase())
                    || item.lastName?.toLowerCase().includes(searchFilter.toLowerCase())
          );


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
               ShowMessageToast("Usuario eliminado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
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
                    isLoading && <Loading />
               }
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>Lista de Usuarios</h4>
                              <p>Gestione sus usuarios</p>
                         </div>
                         <div>
                              <Link to="/users/adduser" className='btn btn-primary'><Icon.Plus size={20} /><span>Agregar usuario</span></Link>
                         </div>
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
                                                  <th>Nombre de Usuario</th>
                                                  <th>Email</th>
                                                  <th>Nombre</th>
                                                  <th>Apellido</th>
                                                  <th className='table-header-icons'></th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {paginatedData.length > 0 ? (
                                                  paginatedData.map((user, i) => (
                                                       <tr key={i}>
                                                            <td>{user.userName}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.firstName}</td>
                                                            <td>{user.lastName}</td>
                                                            <td style={{ width: 100 }} >
                                                                 <div className='table-row-icons'>
                                                                      <Link to={`/users/adduser/${user.id}`}><Icon.PencilSquare className='table-row-icon' size={20}></Icon.PencilSquare></Link>
                                                                      <Icon.Trash size={20} onClick={() => { handleShow(user.id) }}></Icon.Trash>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))
                                             ) : (
                                                  <tr>
                                                       <td colSpan={3}>No data found</td>
                                                  </tr>
                                             )}
                                        </tbody>
                                   </Table>
                                   <div className='pagination-footer'>
                                        <div className='show-per-page'>
                                             <div>
                                                  Mostrar por página:
                                             </div>
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

               <ModalDelete show={show} headerContent="¿Realmente quiere eliminar el usuario?" handleClose={handleClose} handleDelete={handleDelete} />
          </>
     )
}

export default index